using Microsoft.AspNetCore.Mvc;

namespace ApiSource.Controllers {
    [ApiController]
    [Route("debug")]
    public class DebugController : ControllerBase {
        public DebugController() {
        }

        [HttpGet]
        public string Get() {
            return "Hello world!";
        }

        [HttpGet("{name}")]
        public string GetNamed(string name) {
            return $"Hello {name}!";
        }
    }
}
