using ApiSource.Points;
using ApiSource.Points.Filters;

namespace ApiSource.Repositories {
    public interface IExternalDeliveryPointRepository {
        public Task<List<ExternalDeliveryPoint>> GetPoints(IEnumerable<IPointFilter> filters);
    }
}
