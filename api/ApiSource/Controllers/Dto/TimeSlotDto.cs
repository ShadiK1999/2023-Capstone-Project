using ApiSource.Points;

namespace ApiSource.Controllers.Dto {
    /// <summary>
    /// A period of time on a day of the week.
    /// </summary>
    public class TimeSlotDto {
        public DayOfWeek Day { get; set; }
        public int StartHour { get; set; }
        public int StartMinute { get; set; }
        public int EndHour { get; set; }
        public int EndMinute { get; set; }
    }
}
