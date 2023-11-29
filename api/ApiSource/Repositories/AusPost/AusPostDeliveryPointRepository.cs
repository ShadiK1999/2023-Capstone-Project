using ApiSource.Points;
using ApiSource.Points.Filters;

namespace ApiSource.Repositories.AusPost {
    public class AusPostDeliveryPointRepository : IExternalDeliveryPointRepository {
        private static readonly Coords DEFAULT_CENTER = new(-37.80411498800493, 144.95009426875083);
        private const int DEFAULT_RANGE = 1000;
        private IAusPostApi _api;

        public AusPostDeliveryPointRepository(IAusPostApi api) {
            _api = api;
        }

        public async Task<List<ExternalDeliveryPoint>> GetPoints(IEnumerable<IPointFilter> filters) {
            Coords center = DEFAULT_CENTER;
            int range = DEFAULT_RANGE;

            foreach (IPointFilter filter in filters) {
                if (filter is LocationFilter locationFilter) {
                    center = locationFilter.Center;
                    range = locationFilter.RangeKm;
                }
            }

            List<ExternalDeliveryPoint> retrievedPoints = await _api.GetGeoLocations(center, range);
            return retrievedPoints.Where(point => filters.All(filter => filter.Matches(point))).ToList();
        }
    }
}
