using ApiSource.Points;

namespace ApiSource.Controllers.Dto.Conversion {
    public class TimeSlotConverter : IDtoParser<TimeSlot, TimeSlotDto>, IDtoBuilder<TimeSlot, TimeSlotDto> {
        public TimeSlot ParseDto(TimeSlotDto dto) {
            return new TimeSlot() {
                Day = dto.Day,
                StartHour = dto.StartHour,
                StartMinute = dto.StartMinute,
                EndHour = dto.EndHour,
                EndMinute = dto.EndMinute
            };
        }

        public TimeSlotDto BuildDto(TimeSlot slot) {
            return new TimeSlotDto() {
                Day = slot.Day,
                StartHour = slot.StartHour,
                StartMinute = slot.StartMinute,
                EndHour = slot.EndHour,
                EndMinute = slot.EndMinute
            };
        }
    }
}
