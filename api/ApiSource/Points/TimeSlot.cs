namespace ApiSource.Points {
    public struct TimeSlot {
        public DayOfWeek Day { get; set; }
        public int StartHour { get; set; }
        public int StartMinute { get; set; }
        public int EndHour { get; set; }
        public int EndMinute { get; set; }

        public TimeSlot(DayOfWeek day, int startHour, int startMinute, int endHour, int endMinute) {
            Day = day;
            StartHour = startHour;
            StartMinute = startMinute;
            EndHour = endHour;
            EndMinute = endMinute;
        }
    }
}
