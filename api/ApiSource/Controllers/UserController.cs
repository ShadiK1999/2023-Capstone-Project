using ApiSource.Controllers.Dto;
using ApiSource.Controllers.Dto.Conversion;
using ApiSource.Repositories;
using ApiSource.Repositories.Neighbour;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ApiSource.Controllers {
    [Controller]
    [Route("users")]
    public class UserController : ControllerBase {
        private readonly IUserRepository _userRepository;
        private readonly IDtoBuilder<NeighbourUser, UserInfoDto> _userDtoBuilder;

        public UserController(IUserRepository userRepository, IDtoBuilder<NeighbourUser, UserInfoDto> userDtoBuilder) {
            _userRepository = userRepository;
            _userDtoBuilder = userDtoBuilder;
        }

        private UserInfoDto ConstructDto(NeighbourUser user, bool authorized) {
            UserInfoDto dto = _userDtoBuilder.BuildDto(user);
            if (!authorized) {
                dto.Email = null;
            }
            return dto;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] NewUserDto dto) {
            if (await _userRepository.CreateUser(dto.Name, dto.Email, dto.Password, dto.PhoneNumber)) {
                NeighbourUser? user = await _userRepository.GetUserByEmail(dto.Email);
                if (user == null) {
                    return StatusCode(500);
                }

                return CreatedAtAction(nameof(GetUser), new Dictionary<string, string> { { "id", user.Id } }, ConstructDto(user, true));
            } else {
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(string id) {
            NeighbourUser? loggedInUser = await _userRepository.GetUserByClaims(User);
            NeighbourUser? user = await _userRepository.GetUserById(id);

            if (user == null) {
                return NotFound();
            }

            bool authorized = loggedInUser == user;
            return Ok(ConstructDto(user, authorized));
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id) {
            NeighbourUser? loggedInUser = await _userRepository.GetUserByClaims(User);
            NeighbourUser? user = await _userRepository.GetUserById(id);

            if (user == null) {
                return NotFound();
            } else if (loggedInUser != user) {
                return Unauthorized();
            }

            if (await _userRepository.DeleteUser(user)) {
                return NoContent();
            } else {
                return StatusCode(500);
            }
        }

        [Authorize]
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] EditUserDto editUserDto) {
            NeighbourUser? loggedInUser = await _userRepository.GetUserByClaims(User);
            NeighbourUser? user = await _userRepository.GetUserById(id);

            if (user == null) {
                return NotFound();
            } else if (loggedInUser != user) {
                return Unauthorized();
            }

            bool noErrors = true;
            bool saveChangesToNormalFields = false;

            if (editUserDto.NameChange != null) {
                user.DisplayName = editUserDto.NameChange;
                saveChangesToNormalFields = true;
            }

            if (editUserDto.PhoneNumberChange != null) {
                user.PhoneNumber = editUserDto.PhoneNumberChange;
                saveChangesToNormalFields = true;
            }

            if (saveChangesToNormalFields) {
                noErrors = await _userRepository.UpdateUser(user);
            }

            if (noErrors && editUserDto.PasswordChange != null) {
                noErrors = await _userRepository.UpdatePassword(
                    user,
                    editUserDto.PasswordChange.CurrentPassword,
                    editUserDto.PasswordChange.NewPassword);
            }

            return noErrors ? Ok(ConstructDto(user, true)) : BadRequest();
        }
    }
}
