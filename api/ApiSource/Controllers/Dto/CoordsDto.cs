using ApiSource.Points;

namespace ApiSource.Controllers.Dto {
    /// <summary>
    /// Coordinates of a location.
    /// </summary>
    public class CoordsDto {
        /// <summary>
        /// The latitude component as decimal degrees (between -90 and 90).
        /// </summary>
        public double Latitude { get; set; }
        /// <summary>
        /// The longitude component as decimal degrees (between -180 and 180).
        /// </summary>
        public double Longitude { get; set; }

        public CoordsDto() {
            Latitude = 0;
            Longitude = 0;
        }

        public CoordsDto(double latitude, double longitude) {
            Latitude = latitude;
            Longitude = longitude;
        }

        public static CoordsDto Dtoize(Coords coords) {
            return new CoordsDto(coords.Latitude, coords.Longitude);
        }
    }
}
