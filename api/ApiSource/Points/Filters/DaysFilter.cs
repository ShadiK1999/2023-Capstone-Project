namespace ApiSource.Points.Filters {
    public class DaysFilter : IPointFilter {
        public DayOfWeek Day { get; }

        public DaysFilter(DayOfWeek day) {
            Day = day;
        }

        public bool Matches(IDeliveryPoint point) {
            return point.Hours.Any(slot => slot.Day == Day);
        }
    }
}
