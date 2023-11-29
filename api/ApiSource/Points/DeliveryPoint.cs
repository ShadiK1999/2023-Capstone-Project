namespace ApiSource.Points {
    public abstract class DeliveryPoint {
        public Coords Location { get; }
        public string Address { get; }
        public List<TimeSlot> Hours { get; }

        protected DeliveryPoint(Coords location, string address, List<TimeSlot> hours) {
            Location = location;
            Address = address;
            Hours = hours;
        }
    }
}
