using ApiSource.Points;

namespace ApiTest.Points {
    public class CoordsTest {
        private const double ACCEPTABLE_ERROR = 0.01;

        [Test]
        public void TestDistanceFromIdentity() {
            Coords identity = new Coords(0.0, 0.0);
            Coords a = new Coords(50.0, 150.0);
            Coords b = new Coords(-50.0, 150.0);
            Coords c = new Coords(-50.0, 40.0);

            AssertCoordDistance(identity, a, 13760);
            AssertCoordDistance(identity, b, 13760);
            AssertCoordDistance(identity, c, 6723);
        }

        [Test]
        public void TestDistanceBetweenPoints() {
            Coords a = new Coords(50.0, 150.0);
            Coords b = new Coords(-50.0, 150.0);
            Coords c = new Coords(-50.0, 40.0);

            AssertCoordDistance(a, b, 11112);
            AssertCoordDistance(a, c, 15194);
        }

        private void AssertCoordDistance(Coords a, Coords b, int expectedDistance) {
            double lowerBound = expectedDistance - (expectedDistance * ACCEPTABLE_ERROR);
            double upperBound = expectedDistance + (expectedDistance * ACCEPTABLE_ERROR);

            Assert.That(Math.Round(a.DistanceTo(b)), Is.InRange(lowerBound, upperBound));
        }
    }
}
