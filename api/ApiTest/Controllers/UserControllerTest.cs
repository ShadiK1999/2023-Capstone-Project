using ApiSource.Controllers;
using ApiSource.Controllers.Dto;
using ApiSource.Controllers.Dto.Conversion;
using ApiSource.Repositories;
using ApiSource.Repositories.Neighbour;
using Microsoft.AspNetCore.Mvc;

namespace ApiTest.Controllers {
    public class UserControllerTest {
        private UserController BuildController(IUserRepository repository) {
            return new UserController(
                repository,
                new UserConverter(
                    new DeliveryPointConverter(
                        new CoordsConverter(),
                        new TimeSlotConverter()
                     )
                 )
            );
        }

        [Test]
        public async Task TestCreateUserReturnsCreatedAt() {
            var dto = new NewUserDto() {
                Name = "Test name",
                Email = "test@example.com",
                Password = "password1234",
                PhoneNumber = "1234567890"
            };

            var repository = new MockUserRepository();
            var controller = BuildController(repository);

            bool createdOk = false;
            repository.CreateUserImpl = (name, email, password, phone) => {
                createdOk = name == dto.Name && email == dto.Email && password == dto.Password && phone == dto.PhoneNumber;
                return true;
            };
            repository.GetUserByEmailImpl = (email) => {
                if (email == dto.Email) {
                    return new NeighbourUser() {
                        DisplayName = dto.Name,
                        Email = dto.Email,
                        PhoneNumber = dto.PhoneNumber
                    };
                } else {
                    return null;
                }
            };

            IActionResult? result = await controller.CreateUser(dto);
            Assert.That(createdOk);
            Assert.That(result, Is.InstanceOf<CreatedAtActionResult>());
            var crResult = result as CreatedAtActionResult;
            Assert.Multiple(() => {
                Assert.That(crResult!.RouteValues != null && crResult.RouteValues.ContainsKey("id"));
                Assert.That(crResult.Value, Is.Not.Null);
            });
        }

        [Test]
        public async Task TestCreateUserReturnsDto() {
            var dto = new NewUserDto() {
                Name = "Test name",
                Email = "test@example.com",
                Password = "password1234",
                PhoneNumber = "1234567890"
            };

            var repository = new MockUserRepository();
            var controller = BuildController(repository);

            bool createdOk = false;
            repository.CreateUserImpl = (name, email, password, phone) => {
                createdOk = name == dto.Name && email == dto.Email && password == dto.Password && phone == dto.PhoneNumber;
                return true;
            };
            repository.GetUserByEmailImpl = (email) => {
                if (email == dto.Email) {
                    return new NeighbourUser() {
                        DisplayName = dto.Name,
                        Email = dto.Email,
                        PhoneNumber = dto.PhoneNumber
                    };
                } else {
                    return null;
                }
            };

            IActionResult? result = await controller.CreateUser(dto);
            Assert.That(createdOk);
            Assert.That(result, Is.InstanceOf<CreatedAtActionResult>());
            var crResult = result as CreatedAtActionResult;

            Assert.That(crResult!.Value, Is.Not.Null);
            Assert.That(crResult.Value, Is.InstanceOf<UserInfoDto>());

            var returnDto = crResult.Value as UserInfoDto;
            Assert.Multiple(() => {
                Assert.That(returnDto!.DeliveryPoint, Is.Null);
                Assert.That(returnDto.PhoneNumber, Is.EqualTo(dto.PhoneNumber));
                Assert.That(returnDto.Email, Is.EqualTo(dto.Email));
            });
        }

        [Test]
        public async Task TestCreateExistingUserReturnsBadRequest() {
            var dto = new NewUserDto() {
                Name = "Test name",
                Email = "test@example.com",
                Password = "password1234",
                PhoneNumber = "1234567890"
            };

            var repository = new MockUserRepository();
            var controller = BuildController(repository);

            repository.CreateUserImpl = (name, email, password, phone) => {
                return false;
            };

            IActionResult? result = await controller.CreateUser(dto);
            Assert.That(result, Is.InstanceOf<BadRequestResult>());
        }

        [Test]
        public async Task TestGetUserAsAnonDoesNotReturnEmail() {
            var repository = new MockUserRepository();
            var controller = BuildController(repository);

            var sampleUser = new NeighbourUser() {
                Id = "abc",
                DisplayName = "Test name",
                Email = "email@example.com",
                PhoneNumber = "1234567890"
            };

            repository.GetUserByIdImpl = (id) => {
                if (id == "abc") {
                    return sampleUser;
                } else {
                    return null;
                }
            };

            IActionResult? result = await controller.GetUser("abc");
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            OkObjectResult okResult = (result as OkObjectResult)!;
            Assert.That(okResult.Value, Is.InstanceOf<UserInfoDto>());
            UserInfoDto returnDto = (okResult.Value as UserInfoDto)!;

            Assert.Multiple(() => {
                Assert.That(returnDto.Name, Is.EqualTo(sampleUser.DisplayName));
                Assert.That(returnDto.PhoneNumber, Is.EqualTo(sampleUser.PhoneNumber));
                Assert.That(returnDto.Email, Is.Null);
            });
        }
        [Test]
        public async Task TestGetUserAsOtherUserDoesNotReturnEmail() {
            var repository = new MockUserRepository();
            var controller = BuildController(repository);

            var sampleUser = new NeighbourUser() {
                Id = "abc",
                DisplayName = "Test name",
                Email = "email@example.com",
                PhoneNumber = "1234567890"
            };

            var loggedInUser = new NeighbourUser() {
                Id = "def",
                DisplayName = "Test name 2",
                Email = "email 2@example.com",
                PhoneNumber = "98989898"
            };

            repository.GetUserByClaimsImpl = (claims) => loggedInUser;
            repository.GetUserByIdImpl = (id) => {
                if (id == "abc") {
                    return sampleUser;
                } else {
                    return null;
                }
            };

            IActionResult? result = await controller.GetUser("abc");
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            OkObjectResult okResult = (result as OkObjectResult)!;
            Assert.That(okResult.Value, Is.InstanceOf<UserInfoDto>());
            UserInfoDto returnDto = (okResult.Value as UserInfoDto)!;

            Assert.Multiple(() => {
                Assert.That(returnDto.Name, Is.EqualTo(sampleUser.DisplayName));
                Assert.That(returnDto.PhoneNumber, Is.EqualTo(sampleUser.PhoneNumber));
                Assert.That(returnDto.Email, Is.Null);
            });
        }

        [Test]
        public async Task TestGetUserAsUserDoesReturnEmail() {
            var repository = new MockUserRepository();
            var controller = BuildController(repository);

            var sampleUser = new NeighbourUser() {
                Id = "abc",
                DisplayName = "Test name",
                Email = "email@example.com",
                PhoneNumber = "1234567890"
            };

            repository.GetUserByClaimsImpl = (claims) => sampleUser;
            repository.GetUserByIdImpl = (id) => {
                if (id == "abc") {
                    return sampleUser;
                } else {
                    return null;
                }
            };

            IActionResult? result = await controller.GetUser("abc");
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            OkObjectResult okResult = (result as OkObjectResult)!;
            Assert.That(okResult.Value, Is.InstanceOf<UserInfoDto>());
            UserInfoDto returnDto = (okResult.Value as UserInfoDto)!;

            Assert.Multiple(() => {
                Assert.That(returnDto.Name, Is.EqualTo(sampleUser.DisplayName));
                Assert.That(returnDto.PhoneNumber, Is.EqualTo(sampleUser.PhoneNumber));
                Assert.That(returnDto.Email, Is.EqualTo(sampleUser.Email));
            });
        }

        [Test]
        public async Task TestUpdateNonexistentUserReturnsNotFound() {
            var repository = new MockUserRepository();
            var controller = BuildController(repository);

            var dto = new EditUserDto() {
                NameChange = "Overwritten name"
            };

            IActionResult? result = await controller.UpdateUser("abc", dto);
            Assert.That(result, Is.InstanceOf<NotFoundResult>());
        }


        [Test]
        public async Task TestUpdateUserAsAnonReturnsUnauthorized() {
            var repository = new MockUserRepository();
            var controller = BuildController(repository);

            var sampleUser = new NeighbourUser() {
                Id = "abc",
                DisplayName = "Test name",
                Email = "email@example.com",
                PhoneNumber = "1234567890"
            };

            repository.GetUserByClaimsImpl = (claims) => null;
            repository.GetUserByIdImpl = (id) => {
                if (id == "abc") {
                    return sampleUser;
                } else {
                    return null;
                }
            };

            bool updateCalled = false;
            repository.UpdateUserImpl = (user) => updateCalled = true;
            repository.UpdatePasswordImpl = (user, oldPwd, newPwd) => updateCalled = true;

            var dto = new EditUserDto() {
                NameChange = "Overwritten name"
            };

            IActionResult? result = await controller.UpdateUser("abc", dto);
            Assert.That(result, Is.InstanceOf<UnauthorizedResult>());
            Assert.That(updateCalled, Is.False);
        }

        [Test]
        public async Task TestUpdateUserAsOtherUserReturnsUnauthorized() {
            var repository = new MockUserRepository();
            var controller = BuildController(repository);

            var sampleUser = new NeighbourUser() {
                Id = "abc",
                DisplayName = "Test name",
                Email = "email@example.com",
                PhoneNumber = "1234567890"
            };

            var loggedInUser = new NeighbourUser() {
                Id = "def",
                DisplayName = "Test name 2",
                Email = "email 2@example.com",
                PhoneNumber = "98989898"
            };

            repository.GetUserByClaimsImpl = (claims) => loggedInUser;
            repository.GetUserByIdImpl = (id) => {
                if (id == "abc") {
                    return sampleUser;
                } else {
                    return null;
                }
            };

            bool updateCalled = false;
            repository.UpdateUserImpl = (user) => updateCalled = true;
            repository.UpdatePasswordImpl = (user, oldPwd, newPwd) => updateCalled = true;

            var dto = new EditUserDto() {
                NameChange = "Overwritten name"
            };

            IActionResult? result = await controller.UpdateUser("abc", dto);
            Assert.That(result, Is.InstanceOf<UnauthorizedResult>());
            Assert.That(updateCalled, Is.False);
        }

        [Test]
        public async Task TestUpdateUserAsUserSucceeds() {
            var repository = new MockUserRepository();
            var controller = BuildController(repository);

            var sampleUser = new NeighbourUser() {
                Id = "abc",
                DisplayName = "Test name",
                Email = "email@example.com",
                PhoneNumber = "1234567890"
            };

            bool userUpdatedCorrectly = false;

            repository.GetUserByClaimsImpl = (claims) => sampleUser;
            repository.GetUserByIdImpl = (id) => {
                if (id == "abc") {
                    return sampleUser;
                } else {
                    return null;
                }
            };
            repository.UpdateUserImpl = (user) => {
                if (user.DisplayName == "Overwritten name" && user.PhoneNumber == "1234567890") {
                    userUpdatedCorrectly = true;
                }
                return true;
            };

            var dto = new EditUserDto() {
                NameChange = "Overwritten name"
            };

            IActionResult? result = await controller.UpdateUser("abc", dto);
            Assert.Multiple(() => {
                Assert.That(userUpdatedCorrectly, Is.True);
                Assert.That(result, Is.InstanceOf<OkObjectResult>());
            });
            OkObjectResult okResult = (result as OkObjectResult)!;
            Assert.That(okResult.Value, Is.InstanceOf<UserInfoDto>());
            UserInfoDto returnDto = (okResult.Value as UserInfoDto)!;

            Assert.Multiple(() => {
                Assert.That(returnDto.Id, Is.EqualTo(sampleUser.Id));
                Assert.That(returnDto.Name, Is.EqualTo(sampleUser.DisplayName));
                Assert.That(returnDto.PhoneNumber, Is.EqualTo(sampleUser.PhoneNumber));
                Assert.That(returnDto.Email, Is.EqualTo(sampleUser.Email));
            });
        }


        [Test]
        public async Task TestUpdateUserWithBadValidationProblemsReturnsBadRequest() {
            var repository = new MockUserRepository();
            var controller = BuildController(repository);

            var sampleUser = new NeighbourUser() {
                Id = "abc",
                DisplayName = "Test name",
                Email = "email@example.com",
                PhoneNumber = "1234567890"
            };

            repository.GetUserByClaimsImpl = (claims) => sampleUser;
            repository.GetUserByIdImpl = (id) => {
                if (id == "abc") {
                    return sampleUser;
                } else {
                    return null;
                }
            };
            repository.UpdatePasswordImpl = (user, oldPwd, newPwd) => false;

            var dto = new EditUserDto() {
                PasswordChange = new PasswordChangeDto() {
                    CurrentPassword = "password1234",
                    NewPassword = "   "
                }
            };

            IActionResult? result = await controller.UpdateUser("abc", dto);
            Assert.That(result, Is.InstanceOf<BadRequestResult>());
        }

        [Test]
        public async Task TestUpdatePasswordAsUserUpdatesPassword() {
            var repository = new MockUserRepository();
            var controller = BuildController(repository);

            var sampleUser = new NeighbourUser() {
                Id = "abc",
                DisplayName = "Test name",
                Email = "email@example.com",
                PhoneNumber = "1234567890"
            };

            bool passwordUpdatedCorrectly = false;

            repository.GetUserByClaimsImpl = (claims) => sampleUser;
            repository.GetUserByIdImpl = (id) => sampleUser;
            repository.UpdatePasswordImpl = (user, oldPwd, newPwd) => {
                passwordUpdatedCorrectly = oldPwd == "current" && newPwd == "new";
                return true;
            };

            var dto = new EditUserDto() {
                PasswordChange = new PasswordChangeDto() {
                    CurrentPassword = "current",
                    NewPassword = "new"
                }
            };

            IActionResult? result = await controller.UpdateUser("abc", dto);
            Assert.That(passwordUpdatedCorrectly, Is.True);
        }


        [Test]
        public async Task TestUpdatePasswordAsUserReturnsUserInfo() {
            var repository = new MockUserRepository();
            var controller = BuildController(repository);

            var sampleUser = new NeighbourUser() {
                Id = "abc",
                DisplayName = "Test name",
                Email = "email@example.com",
                PhoneNumber = "1234567890"
            };

            bool passwordUpdatedCorrectly = false;

            repository.GetUserByClaimsImpl = (claims) => sampleUser;
            repository.GetUserByIdImpl = (id) => sampleUser;
            repository.UpdatePasswordImpl = (user, oldPwd, newPwd) => {
                passwordUpdatedCorrectly = oldPwd == "current" && newPwd == "new";
                return true;
            };

            var dto = new EditUserDto() {
                PasswordChange = new PasswordChangeDto() {
                    CurrentPassword = "current",
                    NewPassword = "new"
                }
            };

            IActionResult? result = await controller.UpdateUser("abc", dto);
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            OkObjectResult okResult = (result as OkObjectResult)!;
            Assert.That(okResult.Value, Is.InstanceOf<UserInfoDto>());
        }

        [Test]
        public async Task TestUpdatePasswordDoesNotRedundantlyUpdate() {
            var repository = new MockUserRepository();
            var controller = BuildController(repository);

            var sampleUser = new NeighbourUser() {
                Id = "abc",
                DisplayName = "Test name",
                Email = "email@example.com",
                PhoneNumber = "1234567890"
            };

            bool userUpdatedUnnecessarily = false;

            repository.GetUserByClaimsImpl = (claims) => sampleUser;
            repository.GetUserByIdImpl = (id) => sampleUser;
            repository.UpdateUserImpl = (user) => {
                userUpdatedUnnecessarily = true;
                return true;
            };

            var dto = new EditUserDto() {
                PasswordChange = new PasswordChangeDto() {
                    CurrentPassword = "current",
                    NewPassword = "new"
                }
            };

            IActionResult? result = await controller.UpdateUser("abc", dto);
            Assert.That(userUpdatedUnnecessarily, Is.False);
        }

        [Test]
        public async Task TestDeleteUserAsAnonReturnsUnauthorized() {
            var repository = new MockUserRepository();
            var controller = BuildController(repository);

            var sampleUser = new NeighbourUser() {
                Id = "abc",
                DisplayName = "Test name",
                Email = "email@example.com",
                PhoneNumber = "1234567890"
            };

            repository.GetUserByClaimsImpl = (claims) => null;
            repository.GetUserByIdImpl = (id) => sampleUser;

            bool deleted = false;
            repository.DeleteUserImpl = (user) => deleted = true;

            IActionResult? result = await controller.DeleteUser("abc");
            Assert.Multiple(() => {
                Assert.That(result, Is.InstanceOf<UnauthorizedResult>());
                Assert.That(deleted, Is.False);
            });
        }

        [Test]
        public async Task TestDeleteUserAsOtherUserReturnsUnauthorized() {
            var repository = new MockUserRepository();
            var controller = BuildController(repository);

            var sampleUser = new NeighbourUser() {
                Id = "abc",
                DisplayName = "Test name",
                Email = "email@example.com",
                PhoneNumber = "1234567890"
            };

            var loggedInUser = new NeighbourUser() {
                Id = "def",
                DisplayName = "Test name 2",
                Email = "email 2@example.com",
                PhoneNumber = "98989898"
            };

            repository.GetUserByClaimsImpl = (claims) => loggedInUser;
            repository.GetUserByIdImpl = (id) => sampleUser;

            bool deleted = false;
            repository.DeleteUserImpl = (user) => deleted = true;

            IActionResult? result = await controller.DeleteUser("abc");
            Assert.Multiple(() => {
                Assert.That(result, Is.InstanceOf<UnauthorizedResult>());
                Assert.That(deleted, Is.False);
            });
        }

        [Test]
        public async Task TestDeleteUserAsUserSucceeds() {
            var repository = new MockUserRepository();
            var controller = BuildController(repository);

            var sampleUser = new NeighbourUser() {
                Id = "abc",
                DisplayName = "Test name",
                Email = "email@example.com",
                PhoneNumber = "1234567890"
            };

            repository.GetUserByClaimsImpl = (claims) => sampleUser;
            repository.GetUserByIdImpl = (id) => sampleUser;

            bool deleted = false;
            repository.DeleteUserImpl = (user) => deleted = (user == sampleUser);

            IActionResult? result = await controller.DeleteUser("abc");
            Assert.Multiple(() => {
                Assert.That(result, Is.InstanceOf<NoContentResult>());
                Assert.That(deleted, Is.True);
            });
        }
    }
}
