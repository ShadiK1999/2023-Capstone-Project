using ApiSource.Points.Filters;

namespace ApiSource.Controllers.Dto.Filters {
    /// <summary>
    /// Filters points by their proximity to a given location. The `filterType` parameter must be `"location"`.
    /// </summary>
    public class LocationFilterDto : PointFilterDto {
        /// <summary>
        /// The central location of this filter.
        /// </summary>
        public CoordsDto Coords { get; set; } = new CoordsDto();
        /// <summary>
        /// The maximum range (in kilometres) that a point can be from the central location
        /// to be included in this filter.
        /// </summary>
        public int RangeKm { get; set; } = 0;

        public override IPointFilter AsFilter() {
            return new LocationFilter(
                new Points.Coords(Coords.Latitude, Coords.Longitude),
                RangeKm
            );
        }
    }
}
