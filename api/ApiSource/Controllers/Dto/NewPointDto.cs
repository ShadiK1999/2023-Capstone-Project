namespace ApiSource.Controllers.Dto {
    public class NewPointDto {
        public CoordsDto Location { get; set; } = new CoordsDto(0, 0);
        public string Address { get; set; } = "";
        public List<TimeSlotDto> Hours { get; set; } = new List<TimeSlotDto>();
    }
}
