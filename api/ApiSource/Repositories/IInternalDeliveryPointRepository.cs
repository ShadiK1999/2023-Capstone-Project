using ApiSource.Points;
using ApiSource.Points.Filters;
using ApiSource.Repositories.Neighbour;

namespace ApiSource.Repositories {
    public interface IInternalDeliveryPointRepository {
        public Task<InternalDeliveryPoint?> GetPoint(string id);
        public Task<InternalDeliveryPoint?> CreatePoint(NeighbourUser user, Coords coords, string address, List<TimeSlot> timeSlots);
        public Task<bool> UpdatePoint(InternalDeliveryPoint point);
        public Task<bool> DeletePoint(InternalDeliveryPoint point);
        public Task<List<InternalDeliveryPoint>> GetPoints(IEnumerable<IPointFilter> filters);
    }
}
