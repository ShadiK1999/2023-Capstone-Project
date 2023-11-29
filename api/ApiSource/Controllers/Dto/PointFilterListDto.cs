using ApiSource.Controllers.Dto.Filters;

namespace ApiSource.Controllers.Dto {
    public class PointFilterListDto {
        public List<PointFilterDto> Filters { get; set; } = new List<PointFilterDto>();
    }
}
