using ApiSource.Points;
using ApiSource.Points.Filters;

namespace ApiTest.Points.Filters {
    public class HoursFilterTest {
        private TestDeliveryPoint _pointA;

        [SetUp]
        public void SetUp() {
            _pointA = new(new Coords(-37.81170996356492, 144.97206692366473), "Melbourne");
        }

        [Test]
        public void TestMatchHoursInRange() {
            HoursFilter hoursFilter = new HoursFilter(8, 15, 20, 50);
            var timeslot = new TimeSlot(DayOfWeek.Sunday, 0, 0, 23, 59);

            _pointA.Hours.Add(timeslot);
            Assert.That(hoursFilter.Matches(_pointA), Is.True);
        }

        [Test]  //Filter time ends before slot time starts. Expect return false
        public void TestMatchFilterEndsBeforeSlotStarts() {
            HoursFilter hoursFilter = new HoursFilter(8, 15, 9, 50);
            var timeslot = new TimeSlot(DayOfWeek.Sunday, 10, 0, 23, 59);

            _pointA.Hours.Add(timeslot);
            Assert.That(hoursFilter.Matches(_pointA), Is.False);
        }

        [Test]  //Filter time starts and ends before slot time starts. Expect returnn false
        public void TestMatchFilterStartsAfterSlotEndTime() {
            HoursFilter hoursFilter = new HoursFilter(8, 15, 18, 50);
            var timeslot = new TimeSlot(DayOfWeek.Sunday, 20, 0, 23, 59);

            _pointA.Hours.Add(timeslot);
            Assert.That(hoursFilter.Matches(_pointA), Is.False);
        }

        [Test]  //Start hour is before start hour of _pointA, all other times fall in range. Expect return true there is still overlap between slot open time and filter
        public void TestMatchesStartHourNotInRange() {
            HoursFilter hoursFilter = new HoursFilter(5, 15, 20, 50);
            var timeslot = new TimeSlot(DayOfWeek.Sunday, 8, 0, 23, 59);

            _pointA.Hours.Add(timeslot);
            Assert.That(hoursFilter.Matches(_pointA), Is.True);
        }

        [Test]  //End hour is after ending hour of _pointA, all other times fall in range. Expect return true there is still overlap between slot open time and filter
        public void TestMatchesEndHourNotInRange() {
            HoursFilter hoursFilter = new HoursFilter(9, 15, 20, 50);
            var timeslot = new TimeSlot(DayOfWeek.Sunday, 4, 0, 18, 59);

            _pointA.Hours.Add(timeslot);
            Assert.That(hoursFilter.Matches(_pointA), Is.True);
        }

        [Test]  //Start minute is before start minute of _pointA, all other times fall in range. Expected return true because there is still overlap between slot open time and filter
        public void TestMatchesStartMinuteNotInRange() {
            HoursFilter hoursFilter = new HoursFilter(13, 0, 20, 50);
            var timeslot = new TimeSlot(DayOfWeek.Sunday, 12, 15, 23, 59);

            _pointA.Hours.Add(timeslot);
            Assert.That(hoursFilter.Matches(_pointA), Is.True);
        }

        [Test]  //End minute is after ending minute of _pointA, all other times fall in range. Expected return true because there is still overlap between slot open time and filter
        public void TestMatchesEndMinuteNotInRange() {
            HoursFilter hoursFilter = new HoursFilter(12, 30, 19, 59);
            var timeslot = new TimeSlot(DayOfWeek.Sunday, 10, 0, 20, 45);

            _pointA.Hours.Add(timeslot);
            Assert.That(hoursFilter.Matches(_pointA), Is.True);
        }

        [Test]  //Start minute is before starting minute of _pointA, start hours are the same. Expected return true because there is still overlap between slot open time and filter
        public void TestMatchesStartHoursSameStartMinuteNotInRange() {
            HoursFilter hoursFilter = new HoursFilter(12, 20, 23, 59);
            var timeslot = new TimeSlot(DayOfWeek.Sunday, 12, 30, 20, 59);

            _pointA.Hours.Add(timeslot);
            Assert.That(hoursFilter.Matches(_pointA), Is.True);
        }

        [Test]  //End minute is after ending minute of _pointA, ending hours are the same. Expected return true because there is still overlap between slot open time and filter
        public void TestMatchesEndHourSameEndMinuteNotInRange() {
            HoursFilter hoursFilter = new HoursFilter(7, 21, 20, 50);
            var timeslot = new TimeSlot(DayOfWeek.Sunday, 6, 20, 20, 45);

            _pointA.Hours.Add(timeslot);
            Assert.That(hoursFilter.Matches(_pointA), Is.True);
        }

        [Test]  //Both timeslots are within the range of the filter. Expect return true
        public void TestPointHasMultipleTimeslotsAllInRange() {
            HoursFilter hoursFilter = new HoursFilter(4, 30, 20, 59);
            var timeslot1 = new TimeSlot(DayOfWeek.Sunday, 6, 20, 20, 45);
            var timeslot2 = new TimeSlot(DayOfWeek.Monday, 21, 30, 23, 59);

            _pointA.Hours.Add(timeslot1);
            _pointA.Hours.Add(timeslot2);

            Assert.That(hoursFilter.Matches(_pointA), Is.True);
        }

        [Test]  //One timeslot is within the range of the filter, one is not. Expect return true
        public void TestPointHasMultipleTimeslotsOneInRangeOneNotInRange() {
            HoursFilter hoursFilter = new HoursFilter(4, 30, 20, 59);
            var timeslot1 = new TimeSlot(DayOfWeek.Sunday, 6, 20, 20, 45);
            var timeslot2 = new TimeSlot(DayOfWeek.Monday, 0, 30, 3, 59);

            _pointA.Hours.Add(timeslot1);
            _pointA.Hours.Add(timeslot2);

            Assert.That(hoursFilter.Matches(_pointA), Is.True);
        }

        [Test]  //Neither timeslot is within the range of the filter. Expect return false
        public void TestPointHasMultipleTimeslotsBothOutOfRange() {
            HoursFilter hoursFilter = new HoursFilter(4, 30, 20, 59);
            var timeslot1 = new TimeSlot(DayOfWeek.Sunday, 21, 0, 23, 45);
            var timeslot2 = new TimeSlot(DayOfWeek.Monday, 0, 30, 3, 59);

            _pointA.Hours.Add(timeslot1);
            _pointA.Hours.Add(timeslot2);

            Assert.That(hoursFilter.Matches(_pointA), Is.False);
        }

        [Test]  //All timeslots are out of range. Expect return false
        public void TestPointHasLotsOfTimeslotsOutOfRange() {
            HoursFilter hoursFilter = new HoursFilter(4, 30, 20, 59);
            var timeslot1 = new TimeSlot(DayOfWeek.Sunday, 0, 0, 0, 45);
            var timeslot2 = new TimeSlot(DayOfWeek.Monday, 0, 30, 1, 59);
            var timeslot3 = new TimeSlot(DayOfWeek.Tuesday, 1, 0, 3, 59);
            var timeslot4 = new TimeSlot(DayOfWeek.Wednesday, 2, 30, 4, 29);
            var timeslot5 = new TimeSlot(DayOfWeek.Thursday, 3, 30, 4, 15);
            var timeslot6 = new TimeSlot(DayOfWeek.Friday, 21, 0, 22, 59);
            var timeslot7 = new TimeSlot(DayOfWeek.Saturday, 22, 30, 23, 59);
            var timeslot8 = new TimeSlot(DayOfWeek.Sunday, 21, 30, 23, 59);
            var timeslot9 = new TimeSlot(DayOfWeek.Monday, 22, 30, 22, 59);
            var timeslot10 = new TimeSlot(DayOfWeek.Tuesday, 23, 30, 23, 59);

            _pointA.Hours.Add(timeslot1);
            _pointA.Hours.Add(timeslot2);
            _pointA.Hours.Add(timeslot3);
            _pointA.Hours.Add(timeslot4);
            _pointA.Hours.Add(timeslot5);
            _pointA.Hours.Add(timeslot6);
            _pointA.Hours.Add(timeslot7);
            _pointA.Hours.Add(timeslot8);
            _pointA.Hours.Add(timeslot9);
            _pointA.Hours.Add(timeslot10);

            Assert.That(hoursFilter.Matches(_pointA), Is.False);
        }

        [Test]  //All timeslots are out of range except for one. Expect return true
        public void TestPointHasLotsOfTimeslotsOneInRange() {
            HoursFilter hoursFilter = new HoursFilter(4, 30, 20, 59);
            var timeslot1 = new TimeSlot(DayOfWeek.Sunday, 0, 0, 0, 45);
            var timeslot2 = new TimeSlot(DayOfWeek.Monday, 0, 30, 1, 59);
            var timeslot3 = new TimeSlot(DayOfWeek.Tuesday, 1, 0, 3, 59);
            var timeslot4 = new TimeSlot(DayOfWeek.Wednesday, 2, 30, 4, 29);
            var timeslot5 = new TimeSlot(DayOfWeek.Thursday, 3, 30, 4, 15);
            var timeslot6 = new TimeSlot(DayOfWeek.Friday, 21, 0, 22, 59);
            var timeslot7 = new TimeSlot(DayOfWeek.Saturday, 12, 30, 23, 59);
            var timeslot8 = new TimeSlot(DayOfWeek.Sunday, 21, 30, 23, 59);
            var timeslot9 = new TimeSlot(DayOfWeek.Monday, 22, 30, 22, 59);
            var timeslot10 = new TimeSlot(DayOfWeek.Tuesday, 23, 30, 23, 59);

            _pointA.Hours.Add(timeslot1);
            _pointA.Hours.Add(timeslot2);
            _pointA.Hours.Add(timeslot3);
            _pointA.Hours.Add(timeslot4);
            _pointA.Hours.Add(timeslot5);
            _pointA.Hours.Add(timeslot6);
            _pointA.Hours.Add(timeslot7);
            _pointA.Hours.Add(timeslot8);
            _pointA.Hours.Add(timeslot9);
            _pointA.Hours.Add(timeslot10);

            Assert.That(hoursFilter.Matches(_pointA), Is.True);
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
