using ApiSource.Controllers;

namespace ApiTest.Controllers {
    public class DebugControllerTest {
        private DebugController _controller;

        [SetUp]
        public void Setup() {
            _controller = new DebugController();
        }

        [Test]
        public void TestGetReturnsHelloWorld() {
            Assert.That(_controller.Get(), Is.EqualTo("Hello world!"));
        }

        [Test]
        public void TestGetWithParamsReturnsHelloName() {
            Assert.That(_controller.GetNamed("insert name here"), Is.EqualTo("Hello insert name here!"));
        }
    }
}
