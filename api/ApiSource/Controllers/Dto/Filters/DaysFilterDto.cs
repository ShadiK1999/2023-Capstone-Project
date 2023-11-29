using ApiSource.Points.Filters;

namespace ApiSource.Controllers.Dto.Filters {
    public class DaysFilterDto : PointFilterDto {
        public DayOfWeek DayOfWeek { get; set; }

        public override IPointFilter AsFilter() {
            return new DaysFilter(DayOfWeek);
        }
    }
}
