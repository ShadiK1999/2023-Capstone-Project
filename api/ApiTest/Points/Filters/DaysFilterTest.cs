using ApiSource.Points;
using ApiSource.Points.Filters;

namespace ApiTest.Points.Filters {
    public class DaysFilterTest {
        private TestDeliveryPoint _pointA;

        [SetUp]
        public void SetUp() {
            _pointA = new(new Coords(-37.81170996356492, 144.97206692366473), "Melbourne");
        }

        [Test]
        public void TestMatchDays() {
            DaysFilter daysFilter = new DaysFilter(DayOfWeek.Monday);
            var newDay = new TimeSlot(DayOfWeek.Monday, 0, 0, 0, 0);

            _pointA.Hours.Add(newDay);
            Assert.That(daysFilter.Matches(_pointA), Is.True);
        }

        [Test]
        public void TestNotMatchDays() {
            DaysFilter daysFilter = new DaysFilter(DayOfWeek.Sunday);
            var newDay = new TimeSlot(DayOfWeek.Tuesday, 0, 0, 0, 0);

            _pointA.Hours.Add(newDay);
            Assert.That(daysFilter.Matches(_pointA), Is.False);
        }

        [Test]
        public void TestNotMatchDays2() {
            DaysFilter daysFilter = new DaysFilter(DayOfWeek.Tuesday);
            var newDay = new TimeSlot(DayOfWeek.Friday, 0, 0, 0, 0);

            _pointA.Hours.Add(newDay);
            Assert.That(daysFilter.Matches(_pointA), Is.False);
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
