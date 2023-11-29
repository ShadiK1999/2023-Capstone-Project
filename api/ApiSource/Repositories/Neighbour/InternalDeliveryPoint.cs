using ApiSource.Points;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiSource.Repositories.Neighbour {
    public class InternalDeliveryPoint : IDeliveryPoint {
        public Guid Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Address { get; set; } = string.Empty;
        public List<TimeSlot> HoursList { get; set; } = new List<TimeSlot>();

        public string UserId { get; set; } = string.Empty;
        public NeighbourUser User { get; set; } = null!;

        [NotMapped]
        public Coords Location {
            get {
                return new Coords(Latitude, Longitude);
            }
            set {
                Latitude = value.Latitude;
                Longitude = value.Longitude;
            }
        }

        [NotMapped]
        public IList<TimeSlot> Hours => HoursList;
    }
}
