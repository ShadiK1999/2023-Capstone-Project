namespace ApiSource.Points.Filters {
    public class LocationFilter : IPointFilter {
        public Coords Center { get; }
        public int RangeKm { get; }

        public LocationFilter(Coords center, int rangeKm) {
            Center = center;
            RangeKm = rangeKm;
        }

        public bool Matches(IDeliveryPoint point) {
            return Center.DistanceTo(point.Location) <= RangeKm;
        }
    }
}
