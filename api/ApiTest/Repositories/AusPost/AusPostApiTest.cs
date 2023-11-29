using ApiSource.Points;
using ApiSource.Repositories.AusPost;

namespace ApiTest.Repositories.AusPost {
    public class AusPostApiTest {
        private const string GET_GEO_LOCATIONS_RESOURCE = "ApiTest.Repositories.AusPost.Resources.getGeoLocations.json";
        private const string GGL_INVALID_TIMESLOT_RESOURCE = "ApiTest.Repositories.AusPost.Resources.getGeoLocationsInvalidTimeSlot.json";

        [Test]
        public async Task TestGetGeoLocationsParsesContents() {
            var api = new TestAusPostApi(GET_GEO_LOCATIONS_RESOURCE);

            List<ExternalDeliveryPoint> points = await api.GetGeoLocations(new Coords(0, 0), 0);
            Assert.That(points, Has.Count.EqualTo(5));
        }

        [Test]
        public async Task TestGetGeoLocationsRetrievesCorrectData() {
            var api = new TestAusPostApi(GET_GEO_LOCATIONS_RESOURCE);

            List<ExternalDeliveryPoint> points = await api.GetGeoLocations(new Coords(0, 0), 0);

            Assert.That(points, Has.Count.GreaterThan(0));
            ExternalDeliveryPoint point = points[0];

            Assert.Multiple(() => {
                Assert.That(point.Location.Latitude, Is.EqualTo(-37.829866));
                Assert.That(point.Location.Longitude, Is.EqualTo(145.043293));
                Assert.That(point.Address, Is.EqualTo("208 Riversdale Road, HAWTHORN VIC 3122"));
            });
        }

        [Test]
        public async Task TestGetGeoLocationsRetrievesTimeSlots() {
            var api = new TestAusPostApi(GET_GEO_LOCATIONS_RESOURCE);

            List<ExternalDeliveryPoint> points = await api.GetGeoLocations(new Coords(0, 0), 0);

            Assert.That(points, Has.Count.GreaterThan(0));
            ExternalDeliveryPoint point = points[0];
            Assert.That(point.Hours, Has.Count.EqualTo(7));

            Assert.Multiple(() => {
                Assert.That(point.Hours[0].Day, Is.EqualTo(DayOfWeek.Monday));
                Assert.That(point.Hours[0].StartHour, Is.EqualTo(0));
                Assert.That(point.Hours[0].StartMinute, Is.EqualTo(0));

                Assert.That(point.Hours[1].Day, Is.EqualTo(DayOfWeek.Tuesday));
                Assert.That(point.Hours[1].EndHour, Is.EqualTo(23));
                Assert.That(point.Hours[1].EndMinute, Is.EqualTo(59));
            });
        }

        [Test]
        public void TestIllegalTimeSlotDoesNotThrow() {
            var api = new TestAusPostApi(GGL_INVALID_TIMESLOT_RESOURCE);
            Assert.DoesNotThrowAsync(async () => await api.GetGeoLocations(new Coords(0, 0), 0));
        }

        [Test]
        public async Task TestGetGeoLocationsCallsCorrectEndpoint() {
            var api = new TestAusPostApi(
                GET_GEO_LOCATIONS_RESOURCE,
                (endpoint) => Assert.That(endpoint, Is.EqualTo("points/geo/-50.5/25.5?radius=30&types=UPL,PO,OS&limit=10000"))
            );

            await api.GetGeoLocations(new Coords(25.5, -50.5), 30);
        }

        private class TestAusPostApi : AusPostApi {
            private string _responseResource;
            private Action<string>? _assertEndpoint;

            public TestAusPostApi(string responseResource, Action<string>? assertEndpoint = null) : base() {
                _responseResource = responseResource;
                _assertEndpoint = assertEndpoint;
            }

            protected override Task<Stream> GetResponseStream(string endpoint) {
                _assertEndpoint?.Invoke(endpoint);

                Stream? jsonStream = GetType()
                    .Assembly
                    .GetManifestResourceStream(_responseResource);

                return jsonStream != null
                    ? Task.FromResult(jsonStream)
                    : throw new FileNotFoundException("Could not find getGeoLocations.json test resource");
            }
        }
    }
}
