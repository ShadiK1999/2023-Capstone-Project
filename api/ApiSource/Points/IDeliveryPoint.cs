namespace ApiSource.Points {
    public interface IDeliveryPoint {
        public Coords Location { get; }
        public string Address { get; }
        public IList<TimeSlot> Hours { get; }
    }
}
