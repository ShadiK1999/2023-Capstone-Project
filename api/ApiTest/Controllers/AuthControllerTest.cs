using ApiSource.Controllers;
using ApiSource.Controllers.Dto;
using ApiSource.Repositories.Neighbour;
using Microsoft.AspNetCore.Mvc;

namespace ApiTest.Controllers {
    public class AuthControllerTest {
        [Test]
        public async Task TestLoginReturnsDto() {
            var sampleUser = new NeighbourUser() {
                Id = "idabc",
                Email = "test@example.com"
            };

            var repository = new MockUserRepository();
            repository.GetUserByEmailImpl = (email) => email == sampleUser.Email ? sampleUser : null;
            repository.ValidatePasswordImpl = (user, password) => user == sampleUser && password == "password1234";

            var tokenFactory = new MockTokenFactory();
            tokenFactory.CreateTokenImpl = (user) => user == sampleUser ? "sampletoken" : "wrongtoken";

            var controller = new AuthController(repository, tokenFactory);


            var dto = new AuthRequestDto() {
                Email = "test@example.com",
                Password = "password1234"
            };

            IActionResult result = await controller.Login(dto);
            Assert.That(result, Is.InstanceOf<OkObjectResult>());
            AuthTokenDto? resultDto = (result as OkObjectResult)!.Value as AuthTokenDto;
            Assert.That(resultDto, Is.Not.Null);
            Assert.Multiple(() => {
                Assert.That(resultDto.UserId, Is.EqualTo("idabc"));
                Assert.That(resultDto.Token, Is.EqualTo("sampletoken"));
            });
        }

        [Test]
        public async Task TestLoginIncorrectPasswordReturnsUnauthorized() {
            var sampleUser = new NeighbourUser() {
                Id = "idabc",
                Email = "test@example.com"
            };

            var repository = new MockUserRepository();
            repository.GetUserByEmailImpl = (email) => email == sampleUser.Email ? sampleUser : null;
            repository.ValidatePasswordImpl = (user, password) => user == sampleUser && password == "password1234";

            var tokenFactory = new MockTokenFactory();

            var controller = new AuthController(repository, tokenFactory);


            var dto = new AuthRequestDto() {
                Email = "test@example.com",
                Password = "wrongpassword"
            };

            IActionResult result = await controller.Login(dto);
            Assert.That(result, Is.InstanceOf<UnauthorizedResult>());
        }

        [Test]
        public async Task TestLoginNonexistentUserReturnsUnauthorized() {
            var repository = new MockUserRepository();
            repository.GetUserByEmailImpl = (email) => null;
            var tokenFactory = new MockTokenFactory();

            var controller = new AuthController(repository, tokenFactory);

            var dto = new AuthRequestDto() {
                Email = "test@example.com",
                Password = "wrongpassword"
            };

            IActionResult result = await controller.Login(dto);
            Assert.That(result, Is.InstanceOf<UnauthorizedResult>());
        }
    }
}
