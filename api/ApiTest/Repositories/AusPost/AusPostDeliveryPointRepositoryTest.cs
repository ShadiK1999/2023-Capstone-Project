using ApiSource.Points;
using ApiSource.Points.Filters;
using ApiSource.Repositories.AusPost;

namespace ApiTest.Repositories.AusPost {

    public class AusPostDeliveryPointRepositoryTest {
        private AusPostDeliveryPointRepository _repository;
        private DummyAusPostApi _api;
        private Coords _center;
        private List<ExternalDeliveryPoint> _within1Km;
        private List<ExternalDeliveryPoint> _within100Km;
        private List<ExternalDeliveryPoint> _mondayOpen;
        private List<ExternalDeliveryPoint> _tuesdayOpen;
        private List<ExternalDeliveryPoint> _wednesdayOpen;
        private List<ExternalDeliveryPoint> _thursdayOpen;
        private List<ExternalDeliveryPoint> _fridayOpen;
        private List<ExternalDeliveryPoint> _timeSlot1;
        private List<ExternalDeliveryPoint> _timeSlot2;
        private List<ExternalDeliveryPoint> _timeSlot3;
        private List<ExternalDeliveryPoint> _timeSlot4;

        [SetUp]
        public void Setup() {
            _api = new DummyAusPostApi();
            _repository = new AusPostDeliveryPointRepository(_api);
            _center = new Coords(-37.82181203188641, 145.03876908948232);

            _within1Km = new List<ExternalDeliveryPoint>();
            _within100Km = new List<ExternalDeliveryPoint>();
            _api.Points = new List<ExternalDeliveryPoint>();
            _mondayOpen = new List<ExternalDeliveryPoint>();
            _tuesdayOpen = new List<ExternalDeliveryPoint>();
            _wednesdayOpen = new List<ExternalDeliveryPoint>();
            _thursdayOpen = new List<ExternalDeliveryPoint>();
            _fridayOpen = new List<ExternalDeliveryPoint>();
            _timeSlot1 = new List<ExternalDeliveryPoint>();
            _timeSlot2 = new List<ExternalDeliveryPoint>();
            _timeSlot3 = new List<ExternalDeliveryPoint>();
            _timeSlot4 = new List<ExternalDeliveryPoint>();

            var swinburne = new ExternalDeliveryPoint(
                _center,
                "Swinburne",
                new List<TimeSlot>() {
                    new TimeSlot(DayOfWeek.Monday, 7, 0, 12, 59)
                });
            var darwin = new ExternalDeliveryPoint(
                new Coords(-12.46379267616718, 130.84399695785476),
                "Darwin",
                new List<TimeSlot>() {
                    new TimeSlot(DayOfWeek.Monday, 13, 0, 23, 30)
                });
            var auburn = new ExternalDeliveryPoint(
                new Coords(-37.82217610932576, 145.04601157608005),
                "Auburn",
                new List<TimeSlot>() {
                    new TimeSlot(DayOfWeek.Friday, 7, 0, 12, 59)
                });
            var hawthorn = new ExternalDeliveryPoint(
                new Coords(-37.82154204679251, 145.023445520244),
                "Hawthorn",
                new List<TimeSlot>() {
                    new TimeSlot(DayOfWeek.Friday, 13, 0, 23, 30)
                });
            var merimbula = new ExternalDeliveryPoint(
                new Coords(-36.892556508258515, 149.89317630482472),
                "Merimbula",
                new List<TimeSlot>()
                {
                    new TimeSlot(DayOfWeek.Monday, 7, 0, 12, 59),
                    new TimeSlot(DayOfWeek.Friday, 7, 0, 12, 59)
                });
            var moorabbin = new ExternalDeliveryPoint(
                new Coords(-37.93812663675904, 145.04386997410415),
                "Moorabbin",
                new List<TimeSlot>()
                {
                    new TimeSlot(DayOfWeek.Tuesday, 13, 0, 23, 30),
                    new TimeSlot(DayOfWeek.Friday, 13, 0, 23, 30)
                });
            var williamstown = new ExternalDeliveryPoint(
                new Coords(-37.85891878066072, 144.89228174501503),
                "Williamstown",
                new List<TimeSlot>()
                {
                    new TimeSlot(DayOfWeek.Tuesday, 7, 0, 12, 59),
                    new TimeSlot(DayOfWeek.Friday, 13, 0, 23, 30)
                });
            var templestowe = new ExternalDeliveryPoint(
                new Coords(-37.76018631753306, 145.1429073543634),
                "Templestowe",
                new List<TimeSlot>()
                {
                    new TimeSlot(DayOfWeek.Monday, 13, 0, 23, 30),
                    new TimeSlot(DayOfWeek.Tuesday, 13, 0, 23, 30),
                    new TimeSlot(DayOfWeek.Friday, 13, 0, 23, 30)
                });
            var camberwell = new ExternalDeliveryPoint(
                new Coords(-37.831807631155804, 145.0670330257842),
                "Camberwell",
                new List<TimeSlot>()
                {
                    new TimeSlot(DayOfWeek.Wednesday, 1, 0, 4, 0),
                    new TimeSlot(DayOfWeek.Thursday, 5, 0, 6, 59)
                });


            _api.Points.Add(swinburne);
            _within1Km.Add(swinburne);
            _within100Km.Add(swinburne);
            _mondayOpen.Add(swinburne);
            _timeSlot1.Add(swinburne);

            _api.Points.Add(darwin);
            _mondayOpen.Add(darwin);
            _timeSlot2.Add(darwin);

            _api.Points.Add(auburn);
            _within1Km.Add(auburn);
            _within100Km.Add(auburn);
            _fridayOpen.Add(auburn);
            _timeSlot1.Add(auburn);

            _api.Points.Add(hawthorn);
            _within100Km.Add(hawthorn);
            _fridayOpen.Add(hawthorn);
            _timeSlot2.Add(hawthorn);

            _api.Points.Add(merimbula);
            _mondayOpen.Add(merimbula);
            _fridayOpen.Add(merimbula);
            _timeSlot1.Add(merimbula);

            _api.Points.Add(moorabbin);
            _within100Km.Add(moorabbin);
            _tuesdayOpen.Add(moorabbin);
            _fridayOpen.Add(moorabbin);
            _timeSlot2.Add(moorabbin);

            _api.Points.Add(williamstown);
            _within100Km.Add(williamstown);
            _tuesdayOpen.Add(williamstown);
            _fridayOpen.Add(williamstown);
            _timeSlot1.Add(williamstown);
            _timeSlot2.Add(williamstown);

            _api.Points.Add(templestowe);
            _within100Km.Add(templestowe);
            _mondayOpen.Add(templestowe);
            _tuesdayOpen.Add(templestowe);
            _fridayOpen.Add(templestowe);
            _timeSlot2.Add(templestowe);

            _api.Points.Add(camberwell);
            _within100Km.Add(camberwell);
            _wednesdayOpen.Add(camberwell);
            _thursdayOpen.Add(camberwell);
            _timeSlot3.Add(camberwell);
            _timeSlot4.Add(camberwell);
        }

        [Test]
        public async Task TestGetPointsWithSmallLocationFilter() {
            Coords center = _api.Points[0].Location;

            List<ExternalDeliveryPoint> retrievedPoints = await _repository.GetPoints(new List<IPointFilter>() {
                new LocationFilter(center, 1)
            });

            Assert.That(retrievedPoints, Is.EquivalentTo(_within1Km));
        }

        [Test]
        public async Task TestGetPointsWithLargeLocationFilter() {
            Coords center = _api.Points[0].Location;

            List<ExternalDeliveryPoint> retrievedPoints = await _repository.GetPoints(new List<IPointFilter>() {
                new LocationFilter(center, 100)
            });

            Assert.That(retrievedPoints, Is.EquivalentTo(_within100Km));
        }

        [Test]
        public async Task TestGetPointsWithDaysFilterMonday() {
            List<ExternalDeliveryPoint> retrievedPoints = await _repository.GetPoints(new List<IPointFilter>() {
                new DaysFilter(DayOfWeek.Monday)
            });

            Assert.That(retrievedPoints, Is.EquivalentTo(_mondayOpen));
        }

        [Test]
        public async Task TestGetPointsWithDaysFilterFriday() {
            List<ExternalDeliveryPoint> retrievedPoints = await _repository.GetPoints(new List<IPointFilter>() {
                new DaysFilter(DayOfWeek.Friday)
            });

            Assert.That(retrievedPoints, Is.EquivalentTo(_fridayOpen));
        }

        [Test]
        public async Task TestGetPointsWithHoursFilterTimeslot1() {
            List<ExternalDeliveryPoint> retrievedPoints = await _repository.GetPoints(new List<IPointFilter>() {
                new HoursFilter(7, 0, 12, 59)
            });

            Assert.That(retrievedPoints, Is.EquivalentTo(_timeSlot1));
        }

        [Test]
        public async Task TestGetPointsWithHoursFilterTimeslot2() {
            List<ExternalDeliveryPoint> retrievedPoints = await _repository.GetPoints(new List<IPointFilter>() {
                new HoursFilter(13, 0, 23, 30)
            });

            Assert.That(retrievedPoints, Is.EquivalentTo(_timeSlot2));
        }

        [Test]
        public async Task TestGetPointsWithDaysFilterMondayAndHoursFilter1() {
            List<ExternalDeliveryPoint> retrievedPoints = await _repository.GetPoints(new List<IPointFilter>() {
                new DaysFilter(DayOfWeek.Monday),
                new HoursFilter(7, 0, 12, 59)
            });

            List<ExternalDeliveryPoint> sharedFilter = _mondayOpen.Intersect(_timeSlot1).ToList();

            Assert.That(retrievedPoints, Is.EquivalentTo(sharedFilter));
        }

        [Test]
        public async Task TestGetPointsWithDaysFilterMondayAndHoursFilter2() {
            List<ExternalDeliveryPoint> retrievedPoints = await _repository.GetPoints(new List<IPointFilter>() {
                new DaysFilter(DayOfWeek.Monday),
                new HoursFilter(13, 0, 23, 30)
            });

            List<ExternalDeliveryPoint> sharedFilter = _mondayOpen.Intersect(_timeSlot2).ToList();

            Assert.That(retrievedPoints, Is.EquivalentTo(sharedFilter));
        }

        [Test]
        public async Task TestGetPointsWithDaysFilterFridayAndHoursFilter1() {
            List<ExternalDeliveryPoint> retrievedPoints = await _repository.GetPoints(new List<IPointFilter>() {
                new DaysFilter(DayOfWeek.Friday),
                new HoursFilter(7, 0, 12, 59)
            });

            List<ExternalDeliveryPoint> sharedFilter = _fridayOpen.Intersect(_timeSlot1).ToList();

            Assert.That(retrievedPoints, Is.EquivalentTo(sharedFilter));
        }

        [Test]
        public async Task TestGetPointsWithDaysFilterFridayAndHoursFilter2() {
            List<ExternalDeliveryPoint> retrievedPoints = await _repository.GetPoints(new List<IPointFilter>() {
                new DaysFilter(DayOfWeek.Friday),
                new HoursFilter(13, 0, 23, 30)
            });

            List<ExternalDeliveryPoint> sharedFilter = _fridayOpen.Intersect(_timeSlot2).ToList();

            Assert.That(retrievedPoints, Is.EquivalentTo(sharedFilter));
        }

        [Test]
        public async Task TestGetPointsWithDaysFilterFridayAndMultipleHoursFilters() {
            List<ExternalDeliveryPoint> retrievedPoints = await _repository.GetPoints(new List<IPointFilter>() {
                new DaysFilter(DayOfWeek.Friday),
                new HoursFilter(7, 0, 12, 59),
                new HoursFilter(13, 0, 23, 30)
            });

            bool matched = false;
            var sharedFilter = new List<ExternalDeliveryPoint>();
            sharedFilter.AddRange(_fridayOpen.Intersect(_timeSlot1));
            sharedFilter.AddRange(_fridayOpen.Intersect(_timeSlot2));

            foreach (var point in retrievedPoints) {
                if (sharedFilter.Contains(point)) {
                    matched = true;
                    break;
                }
            }

            Assert.IsTrue(matched);
        }

        [Test]
        public async Task TestGetPointsWithMondayFridayFilterAndOneHoursFilter() {
            List<ExternalDeliveryPoint> retrievedPoints = await _repository.GetPoints(new List<IPointFilter>() {
                new DaysFilter(DayOfWeek.Monday),
                new DaysFilter(DayOfWeek.Friday),
                new HoursFilter(7, 0, 12, 59)
            });

            bool matched = false;
            var sharedFilter = new List<ExternalDeliveryPoint>();
            sharedFilter.AddRange(_mondayOpen.Intersect(_timeSlot1));
            sharedFilter.AddRange(_fridayOpen.Intersect(_timeSlot1));

            foreach (var point in retrievedPoints) {
                if (sharedFilter.Contains(point)) {
                    matched = true;
                    break;
                }
            }

            Assert.IsTrue(matched);
        }

        [Test]
        public async Task TestGetPointsWithMondayTuesdayFridayFilterAndTimeslot1() {
            List<ExternalDeliveryPoint> retrievedPoints = await _repository.GetPoints(new List<IPointFilter>() {
                new DaysFilter(DayOfWeek.Monday),
                new DaysFilter(DayOfWeek.Tuesday),
                new DaysFilter(DayOfWeek.Friday),
                new HoursFilter(7, 0, 12, 59)
            });

            bool matched = false;
            var sharedFilter = new List<ExternalDeliveryPoint>();
            sharedFilter.AddRange(_mondayOpen.Intersect(_timeSlot1));
            sharedFilter.AddRange(_tuesdayOpen.Intersect(_timeSlot1));
            sharedFilter.AddRange(_fridayOpen.Intersect(_timeSlot1));

            foreach (var point in retrievedPoints) {
                if (sharedFilter.Contains(point)) {
                    matched = true;
                    break;
                }
            }

            Assert.IsFalse(matched);
        }

        [Test]
        public async Task TestGetPointsWithMondayTuesdayFridayFilterAndTimeslot2() {
            List<ExternalDeliveryPoint> retrievedPoints = await _repository.GetPoints(new List<IPointFilter>() {
                new DaysFilter(DayOfWeek.Monday),
                new DaysFilter(DayOfWeek.Tuesday),
                new DaysFilter(DayOfWeek.Friday),
                new HoursFilter(13, 0, 23, 30)
            });

            bool matched = false;
            var sharedFilter = new List<ExternalDeliveryPoint>();
            sharedFilter.AddRange(_mondayOpen.Intersect(_timeSlot2));
            sharedFilter.AddRange(_tuesdayOpen.Intersect(_timeSlot2));
            sharedFilter.AddRange(_fridayOpen.Intersect(_timeSlot2));

            foreach (var point in retrievedPoints) {
                if (sharedFilter.Contains(point)) {
                    matched = true;
                    break;
                }
            }

            Assert.IsTrue(matched);
        }


        [Test]
        public async Task TestGetPointsWithMultipleDaysAndHours() {
            List<ExternalDeliveryPoint> retrievedPoints = await _repository.GetPoints(new List<IPointFilter>() {
                new DaysFilter(DayOfWeek.Wednesday),
                new DaysFilter(DayOfWeek.Thursday),
                new HoursFilter(1, 0, 4, 0),
                new HoursFilter(5, 0, 6, 59)
            });

            bool matched = false;
            var sharedFilter = new List<ExternalDeliveryPoint>();
            sharedFilter.AddRange(_wednesdayOpen.Intersect(_timeSlot3).Intersect(_timeSlot4));
            sharedFilter.AddRange(_thursdayOpen.Intersect(_timeSlot3).Intersect(_timeSlot4));

            foreach (var point in retrievedPoints) {
                if (sharedFilter.Contains(point)) {
                    matched = true;
                    break;
                }
            }

            Assert.IsTrue(matched);
        }

        [Test]
        public async Task TestGetPointsWithNoFilterReturnsAll() {
            List<ExternalDeliveryPoint> retrievedPoints = await _repository.GetPoints(new List<IPointFilter>());

            Assert.That(retrievedPoints, Is.EquivalentTo(_api.Points));
        }

        private class TestFilter : IPointFilter {
            private readonly List<IDeliveryPoint> _matchedPoints;

            public TestFilter(IEnumerable<IDeliveryPoint> matchedPoints) {
                _matchedPoints = matchedPoints.ToList();
            }

            public bool Matches(IDeliveryPoint point) {
                return _matchedPoints.Contains(point);
            }
        }

        private class DummyAusPostApi : IAusPostApi {
            public List<ExternalDeliveryPoint> Points { get; set; } = new List<ExternalDeliveryPoint>();

            public Task<List<ExternalDeliveryPoint>> GetGeoLocations(Coords center, int rangeKm) {
                return Task.FromResult(Points);
            }
        }
    }
}
