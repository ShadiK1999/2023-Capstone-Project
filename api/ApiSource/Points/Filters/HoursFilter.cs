namespace ApiSource.Points.Filters {
    public class HoursFilter : IPointFilter {
        public int StartHour { get; }
        public int EndHour { get; }
        public int StartMin { get; }
        public int EndMin { get; }

        public HoursFilter(int startHour, int startMin, int endHour, int endMin) {
            StartHour = startHour;
            EndHour = endHour;
            StartMin = startMin;
            EndMin = endMin;
        }

        private float ConvertHoursMinutesToTime(int hour, int minute) {
            return hour + ((float)minute / 60);
        }

        private bool IsTimeWithinRange(TimeSlot slot) {
            float filterStartTime = ConvertHoursMinutesToTime(StartHour, StartMin);
            float filterEndTime = ConvertHoursMinutesToTime(EndHour, EndMin);
            float slotStartTime = ConvertHoursMinutesToTime(slot.StartHour, slot.StartMinute);
            float slotEndTime = ConvertHoursMinutesToTime(slot.EndHour, slot.EndMinute);

            bool outOfBounds = (slotEndTime < filterStartTime) || (slotStartTime > filterEndTime);
            return !outOfBounds;
        }

        public bool Matches(IDeliveryPoint point) {
            return point.Hours.Any(slot => IsTimeWithinRange(slot));
        }
    }
}
