using ApiSource.Points;
using ApiSource.Points.Filters;

namespace ApiTest.Points.Filters {
    public class LocationFilterTest {
        private TestDeliveryPoint _pointA;
        private TestDeliveryPoint _pointB;

        [SetUp]
        public void SetUp() {
            _pointA = new(new Coords(-37.81170996356492, 144.97206692366473), "Melbourne");
            _pointB = new(new Coords(-37.81170996356492, 144.97206692366473), "Sydney");
        }

        [Test]
        public void TestNotMatchOutOfRangePoint() {
            LocationFilter filter = new(_pointA.Location, (int)Math.Round(_pointA.Location.DistanceTo(_pointB.Location) - 50));
            Assert.That(filter.Matches(_pointB), Is.False);
        }

        [Test]
        public void TestMatchInRangePoint() {
            LocationFilter filter = new(_pointA.Location, (int)Math.Round(_pointA.Location.DistanceTo(_pointB.Location) + 50));
            Assert.That(filter.Matches(_pointB), Is.True);
        }

        public class TestDeliveryPoint : IDeliveryPoint {
            public Coords Location { get; }
            public string Address { get; }
            public IList<TimeSlot> Hours { get; }

            public TestDeliveryPoint(Coords location, string address) {
                Location = location;
                Address = address;
                Hours = new List<TimeSlot>();
            }
        }
    }
}
