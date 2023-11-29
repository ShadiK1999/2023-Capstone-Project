using ApiSource.Points;

namespace ApiSource.Controllers.Dto.Conversion {
    public class CoordsConverter : IDtoBuilder<Coords, CoordsDto>, IDtoParser<Coords, CoordsDto> {
        public CoordsDto BuildDto(Coords coords) {
            return new CoordsDto {
                Latitude = coords.Latitude,
                Longitude = coords.Longitude
            };
        }

        public Coords ParseDto(CoordsDto dto) {
            return new Coords(dto.Latitude, dto.Longitude);
        }
    }
}
