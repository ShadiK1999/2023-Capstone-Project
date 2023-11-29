using ApiSource.Repositories.Neighbour;

namespace ApiSource.Controllers.Dto.Conversion {
    public class UserConverter : IDtoBuilder<NeighbourUser, UserInfoDto> {
        IDtoBuilder<InternalDeliveryPoint, DeliveryPointDto> _pointDtoBuilder;
        public UserConverter(IDtoBuilder<InternalDeliveryPoint, DeliveryPointDto> pointDtoBuilder) {
            _pointDtoBuilder = pointDtoBuilder;
        }

        public UserInfoDto BuildDto(NeighbourUser user) {
            return new UserInfoDto() {
                Id = user.Id,
                Name = user.DisplayName,
                PhoneNumber = user.PhoneNumber!,
                DeliveryPoint = user.Point != null ? _pointDtoBuilder.BuildDto(user.Point) : null,
                Email = user.Email
            };
        }
    }
}
