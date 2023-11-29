namespace ApiSource.Controllers.Dto {
    public class EditPointDto {
        public CoordsDto? LocationChange { get; set; }
        public string? AddressChange { get; set; }
        public List<TimeSlotDto>? HoursChange { get; set; }
    }
}
