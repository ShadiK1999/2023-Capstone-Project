using ApiSource.Controllers.Dto;
using ApiSource.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ApiSource.Controllers {
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase {
        private IUserRepository _userRepository;
        private IAuthTokenFactory _authTokenFactory;

        public AuthController(IUserRepository userRepository, IAuthTokenFactory authTokenFactory) {
            _userRepository = userRepository;
            _authTokenFactory = authTokenFactory;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthRequestDto authRequestDto) {
            var user = await _userRepository.GetUserByEmail(authRequestDto.Email);
            if (user != null && await _userRepository.ValidatePassword(user, authRequestDto.Password)) {
                return Ok(new AuthTokenDto {
                    Token = _authTokenFactory.CreateToken(user),
                    UserId = user.Id
                });
            }
            return Unauthorized();
        }
    }
}
