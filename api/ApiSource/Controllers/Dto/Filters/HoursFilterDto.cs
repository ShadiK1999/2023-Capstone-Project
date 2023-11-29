using ApiSource.Points.Filters;

namespace ApiSource.Controllers.Dto.Filters {
    public class HoursFilterDto : PointFilterDto {
        public int StartHour { get; set; }
        public int StartMin { get; set; }
        public int EndHour { get; set; }
        public int EndMin { get; set; }

        public override IPointFilter AsFilter() {
            return new HoursFilter(StartHour, StartMin, EndHour, EndMin);
        }
    }
}

