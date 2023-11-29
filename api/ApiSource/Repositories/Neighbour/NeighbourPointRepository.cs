using ApiSource.Points;
using ApiSource.Points.Filters;
using Microsoft.EntityFrameworkCore;

namespace ApiSource.Repositories.Neighbour {
    public class NeighbourPointRepository : IInternalDeliveryPointRepository {
        private NeighbourContext _context;

        public NeighbourPointRepository(NeighbourContext context) {
            _context = context;
        }

        public async Task<InternalDeliveryPoint?> CreatePoint(NeighbourUser user, Coords coords, string address, List<TimeSlot> timeSlots) {
            InternalDeliveryPoint point = new InternalDeliveryPoint {
                User = user,
                Longitude = (float)coords.Longitude,
                Latitude = (float)coords.Latitude,
                Address = address,
                HoursList = timeSlots
            };

            _context.Points.Add(point);
            await _context.SaveChangesAsync();

            return point;
        }

        public async Task<bool> DeletePoint(InternalDeliveryPoint point) {
            _context.Points.Remove(point);
            await _context.SaveChangesAsync();
            return true;
        }

        public Task<InternalDeliveryPoint?> GetPoint(string id) {
            return Task.FromResult(_context.Points.Include(point => point.User).Where(point => point.Id.ToString() == id).FirstOrDefault());
        }

        public async Task<bool> UpdatePoint(InternalDeliveryPoint point) {
            _context.Points.Update(point);
            await _context.SaveChangesAsync();
            return true;
        }

        public Task<List<InternalDeliveryPoint>> GetPoints(IEnumerable<IPointFilter> filters) {
            return Task.FromResult(_context.Points.Include(point => point.User).AsEnumerable().Where(point => filters.All(filter => filter.Matches(point))).ToList());
        }
    }
}
