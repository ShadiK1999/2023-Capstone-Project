using ApiSource.Repositories.Neighbour;
using Microsoft.AspNetCore.Mvc;

namespace ApiSource.Controllers {
    [ApiController]
    [Route("debug/db")]
    public class DebugDbController : ControllerBase {
        private NeighbourContext _context;

        public DebugDbController(NeighbourContext neighbourContext) {
            _context = neighbourContext;
        }

        [HttpGet]
        public int Get() {
            return _context.Users.Count();
        }
    }
}
