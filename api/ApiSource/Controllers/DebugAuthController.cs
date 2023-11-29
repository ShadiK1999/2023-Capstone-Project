using ApiSource.Repositories;
using ApiSource.Repositories.Neighbour;
using Microsoft.AspNetCore.Mvc;

namespace ApiSource.Controllers {
    [Controller]
    [Route("debug/auth")]
    public class DebugAuthController : ControllerBase {
        private IUserRepository _userRepository;

        public DebugAuthController(IUserRepository userRepository) {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetLoginCheck() {
            NeighbourUser? user = await _userRepository.GetUserByClaims(User);

            if (user == null) {
                return Ok($"You are not authenticated.");
            } else {
                return Ok($"You are authenticated as {user.DisplayName} ({user.Email})!");
            }
        }
    }
}
