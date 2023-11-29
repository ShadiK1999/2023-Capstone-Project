namespace ApiSource.Controllers.Dto {
    /// <summary>
    /// A delivery point with associated metadata.
    /// </summary>
    public class DeliveryPointDto {
        /// <summary>
        /// The coordinates of this delivery point.
        /// </summary>
        public CoordsDto Location { get; set; } = new CoordsDto(0, 0);
        /// <summary>
        /// The address of this delivery point.
        /// </summary>
        public string Address { get; set; } = "";
        /// <summary>
        /// The hours in the week that this delivery point is open for.
        /// </summary>
        public List<TimeSlotDto> Hours { get; set; } = new List<TimeSlotDto>();
        /// <summary>
        /// The internal ID of this delivery point. @null if this delivery point is external.
        /// </summary>
        public string? Id { get; set; }
        /// <summary>
        /// The ID of the user that owns this delivery point. @null if this delivery point is external.
        /// </summary>
        public string? UserId { get; set; }
    }
}
