using ApiSource.Controllers.Dto;
using ApiSource.Controllers.Dto.Conversion;
using ApiSource.Points;
using ApiSource.Points.Filters;
using ApiSource.Repositories;
using ApiSource.Repositories.Neighbour;
using Microsoft.AspNetCore.Mvc;

namespace ApiSource.Controllers {
    [ApiController]
    [Route("points/search")]
    [Produces("application/json")]
    public class PointSearchController : ControllerBase {
        private IExternalDeliveryPointRepository _externalRepository;
        private IInternalDeliveryPointRepository _internalRepository;
        private IDtoBuilder<ExternalDeliveryPoint, DeliveryPointDto> _externalPointDtoBuilder;
        private IDtoBuilder<InternalDeliveryPoint, DeliveryPointDto> _internalPointDtoBuilder;

        public PointSearchController(
            IExternalDeliveryPointRepository externalRepository,
            IInternalDeliveryPointRepository internalRepository,
            IDtoBuilder<ExternalDeliveryPoint, DeliveryPointDto> externalPointDtoBuilder,
            IDtoBuilder<InternalDeliveryPoint, DeliveryPointDto> internalPointDtoBuilder) {
            _externalRepository = externalRepository;
            _internalRepository = internalRepository;
            _externalPointDtoBuilder = externalPointDtoBuilder;
            _internalPointDtoBuilder = internalPointDtoBuilder;
        }

        /// <summary>
        /// Retrieves delivery points (both internal and external) that match the provided filters.
        /// </summary>
        [HttpPost]
        public async Task<DeliveryPointListDto> Search(PointFilterListDto filterListDto) {
            var result = new DeliveryPointListDto();

            List<IPointFilter> filterList = filterListDto.Filters.Select(dto => dto.AsFilter()).ToList();
            List<ExternalDeliveryPoint> externalPoints = await _externalRepository.GetPoints(filterList);
            List<InternalDeliveryPoint> internalPoints = await _internalRepository.GetPoints(filterList);

            result.Points = externalPoints
                .Select(_externalPointDtoBuilder.BuildDto)
                .Union(internalPoints.Select(_internalPointDtoBuilder.BuildDto))
                .ToList();

            return result;
        }
    }
}
