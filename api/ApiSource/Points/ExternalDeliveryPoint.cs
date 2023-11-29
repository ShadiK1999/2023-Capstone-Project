namespace ApiSource.Points {
    public class ExternalDeliveryPoint : IDeliveryPoint {
        public Coords Location { get; }
        public string Address { get; }
        public IList<TimeSlot> Hours { get; }

        public ExternalDeliveryPoint(Coords location, string address, IList<TimeSlot> hours) {
            Location = location;
            Address = address;
            Hours = hours;
        }
    }
}
