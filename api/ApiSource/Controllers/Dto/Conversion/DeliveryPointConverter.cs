using ApiSource.Points;
using ApiSource.Repositories.Neighbour;

namespace ApiSource.Controllers.Dto.Conversion {
    public class DeliveryPointConverter
        :
        IDtoBuilder<InternalDeliveryPoint, DeliveryPointDto>,
        IDtoBuilder<ExternalDeliveryPoint, DeliveryPointDto> {

        private IDtoBuilder<Coords, CoordsDto> _coordsDtoBuilder;
        private IDtoBuilder<TimeSlot, TimeSlotDto> _slotDtoBuilder;

        public DeliveryPointConverter(IDtoBuilder<Coords, CoordsDto> coordsDtoBuilder, IDtoBuilder<TimeSlot, TimeSlotDto> slotDtoBuilder) {
            _coordsDtoBuilder = coordsDtoBuilder;
            _slotDtoBuilder = slotDtoBuilder;
        }

        public DeliveryPointDto BuildDto(InternalDeliveryPoint point) {
            return new DeliveryPointDto() {
                Location = _coordsDtoBuilder.BuildDto(point.Location),
                Address = point.Address,
                Hours = point.Hours.Select(_slotDtoBuilder.BuildDto).ToList(),
                Id = point.Id.ToString(),
                UserId = point.UserId
            };
        }

        public DeliveryPointDto BuildDto(ExternalDeliveryPoint point) {
            return new DeliveryPointDto() {
                Location = _coordsDtoBuilder.BuildDto(point.Location),
                Address = point.Address,
                Hours = point.Hours.Select(_slotDtoBuilder.BuildDto).ToList()
            };
        }
    }
}
