using ApiSource.Controllers;
using ApiSource.Controllers.Dto;
using ApiSource.Controllers.Dto.Conversion;
using ApiSource.Controllers.Dto.Filters;
using ApiSource.Points;
using ApiSource.Points.Filters;
using ApiSource.Repositories;
using ApiSource.Repositories.Neighbour;

namespace ApiTest.Controllers {
    public class PointSearchControllerTest {
        private PointSearchController BuildController(
            IExternalDeliveryPointRepository externalRepository) {
            DeliveryPointConverter pointConverter = new DeliveryPointConverter(new CoordsConverter(), new TimeSlotConverter());
            return new PointSearchController(externalRepository, new DummyInternalRepository(), pointConverter, pointConverter);
        }

        [Test]
        public async Task TestNoFilters() {
            PointFilterListDto listDto = new();

            bool filterAssertCalled = false;
            FilterAsserterRepository repository = new((filters) => {
                Assert.That(filters, Has.Count.EqualTo(0));
                filterAssertCalled = true;
            });

            PointSearchController controller = BuildController(repository);
            await controller.Search(listDto);

            Assert.That(filterAssertCalled, Is.True);
        }

        [Test]
        public async Task TestConvertsDtoToLocationFilter() {
            LocationFilterDto filterDto = new() {
                Coords = new CoordsDto(-20, 50),
                RangeKm = 120
            };
            PointFilterListDto listDto = new() {
                Filters = new List<PointFilterDto>() { filterDto }
            };

            LocationFilter? locFilter = null;

            FilterAsserterRepository repository = new((filters) => {
                Assert.That(filters, Has.Count.EqualTo(1));
                Assert.That(filters[0], Is.InstanceOf<LocationFilter>());

                locFilter = (LocationFilter)filters[0];
            });

            PointSearchController controller = BuildController(repository);
            await controller.Search(listDto);

            Assert.That(locFilter, Is.Not.Null);
            Assert.Multiple(() => {
                Assert.That(locFilter.Center.Latitude, Is.EqualTo(filterDto.Coords.Latitude));
                Assert.That(locFilter.Center.Longitude, Is.EqualTo(filterDto.Coords.Longitude));
                Assert.That(locFilter.RangeKm, Is.EqualTo(filterDto.RangeKm));
            });
        }

        [Test]
        public async Task TestConvertsPointsToDto() {
            List<ExternalDeliveryPoint> points = new() {
                new ExternalDeliveryPoint(
                    new Coords(-37.82181203188641, 145.03876908948232),
                    "Swinburne",
                    new List<TimeSlot>() {
                        new TimeSlot(DayOfWeek.Monday, 9, 00, 16, 59)
                    }
                ),
                new ExternalDeliveryPoint(
                    new Coords(-12.46379267616718, 130.84399695785476),
                    "Darwin",
                    new List<TimeSlot>() {
                        new TimeSlot(DayOfWeek.Sunday, 9, 45, 16, 14)
                    }
                )
            };

            TestPointRepository repository = new(points);
            PointSearchController controller = BuildController(repository);

            DeliveryPointListDto pointListDto = await controller.Search(new PointFilterListDto());

            Assert.That(pointListDto.Points, Has.Count.EqualTo(2));

            for (int i = 0; i < points.Count; i++) {
                ExternalDeliveryPoint point = points[i];
                DeliveryPointDto dto = pointListDto.Points[i];

                Assert.Multiple(() => {
                    Assert.That(dto.Id, Is.Null);
                    Assert.That(dto.Address, Is.EqualTo(point.Address));
                    Assert.That(dto.Location.Latitude, Is.EqualTo(point.Location.Latitude));
                    Assert.That(dto.Location.Longitude, Is.EqualTo(point.Location.Longitude));
                });

                Assert.That(dto.Hours, Has.Count.EqualTo(point.Hours.Count));
                Assert.Multiple(() => {
                    Assert.That(dto.Hours[0].Day, Is.EqualTo(point.Hours[0].Day));
                    Assert.That(dto.Hours[0].StartHour, Is.EqualTo(point.Hours[0].StartHour));
                    Assert.That(dto.Hours[0].StartMinute, Is.EqualTo(point.Hours[0].StartMinute));
                    Assert.That(dto.Hours[0].EndHour, Is.EqualTo(point.Hours[0].EndHour));
                    Assert.That(dto.Hours[0].EndMinute, Is.EqualTo(point.Hours[0].EndMinute));
                });
            }
        }

        [Test]
        public async Task TestConvertsDtoToHoursFilter() {
            HoursFilterDto hoursFilterDto = new() {
                StartHour = 0,
                StartMin = 0,
                EndHour = 23,
                EndMin = 59
            };

            PointFilterListDto listDto = new() {
                Filters = new List<PointFilterDto>() { hoursFilterDto }
            };

            HoursFilter? hoursFilter = null;

            FilterAsserterRepository repository = new((filters) => {
                Assert.That(filters, Has.Count.EqualTo(1));
                Assert.That(filters[0], Is.InstanceOf<HoursFilter>());

                hoursFilter = (HoursFilter)filters[0];
            });

            PointSearchController controller = BuildController(repository);
            await controller.Search(listDto);

            Assert.That(hoursFilter, Is.Not.Null);
            Assert.Multiple(() => {
                Assert.That(hoursFilter.StartHour, Is.EqualTo(hoursFilterDto.StartHour));
                Assert.That(hoursFilter.StartMin, Is.EqualTo(hoursFilterDto.StartMin));
                Assert.That(hoursFilter.EndHour, Is.EqualTo(hoursFilterDto.EndHour));
                Assert.That(hoursFilter.EndMin, Is.EqualTo(hoursFilterDto.EndMin));
            });
        }

        [Test]
        public async Task TestConvertsDtoToDaysFilter() {
            DaysFilterDto daysFilterDto = new() {
                DayOfWeek = DayOfWeek.Sunday
            };

            PointFilterListDto listDto = new() {
                Filters = new List<PointFilterDto>() { daysFilterDto }
            };

            DaysFilter? daysFilter = null;

            FilterAsserterRepository repository = new((filters) => {
                Assert.That(filters, Has.Count.EqualTo(1));
                Assert.That(filters[0], Is.InstanceOf<DaysFilter>());

                daysFilter = (DaysFilter)filters[0];
            });

            PointSearchController controller = BuildController(repository);
            await controller.Search(listDto);

            Assert.That(daysFilter, Is.Not.Null);
            Assert.Multiple(() => {
                Assert.That(daysFilter.Day, Is.EqualTo(daysFilterDto.DayOfWeek));
            });
        }

        private class DummyInternalRepository : IInternalDeliveryPointRepository {
            // TODO do proper testing
            public DummyInternalRepository() {

            }

            public Task<InternalDeliveryPoint?> CreatePoint(NeighbourUser user, Coords coords, string address, List<TimeSlot> timeSlots) {
                throw new NotImplementedException();
            }

            public Task<bool> DeletePoint(InternalDeliveryPoint point) {
                throw new NotImplementedException();
            }

            public Task<InternalDeliveryPoint?> GetPoint(string id) {
                throw new NotImplementedException();
            }

            public Task<List<InternalDeliveryPoint>> GetPoints(IEnumerable<IPointFilter> filters) {
                return Task.FromResult(new List<InternalDeliveryPoint>());
            }

            public Task<bool> UpdatePoint(InternalDeliveryPoint point) {
                throw new NotImplementedException();
            }
        }

        private class FilterAsserterRepository : IExternalDeliveryPointRepository {
            private readonly Action<List<IPointFilter>> _assertFilters;

            public FilterAsserterRepository(Action<List<IPointFilter>> assertFilters) {
                _assertFilters = assertFilters;
            }

            public Task<List<ExternalDeliveryPoint>> GetPoints(IEnumerable<IPointFilter> filters) {
                _assertFilters(filters.ToList());
                return Task.FromResult(new List<ExternalDeliveryPoint>());
            }
        }

        private class TestPointRepository : IExternalDeliveryPointRepository {
            private readonly List<ExternalDeliveryPoint> _points;

            public TestPointRepository(List<ExternalDeliveryPoint> points) {
                _points = points;
            }

            public Task<List<ExternalDeliveryPoint>> GetPoints(IEnumerable<IPointFilter> filters) {
                return Task.FromResult(_points);
            }
        }
    }
}
