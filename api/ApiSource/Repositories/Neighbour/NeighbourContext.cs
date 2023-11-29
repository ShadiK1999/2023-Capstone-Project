using ApiSource.Points;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Text.RegularExpressions;

namespace ApiSource.Repositories.Neighbour {
    public partial class NeighbourContext : IdentityUserContext<NeighbourUser> {
        public DbSet<InternalDeliveryPoint> Points { get; set; }

        public NeighbourContext(DbContextOptions<NeighbourContext> options) : base(options) {
        }

        [GeneratedRegex("^(\\w+)\\[(\\d+):(\\d+)~(\\d+):(\\d+)\\]$")]
        private static partial Regex TimeSlotRegex();

        private TimeSlot HydrateTimeSlot(string slotStr) {
            var match = TimeSlotRegex().Match(slotStr);

            if (match == null) {
                throw new InvalidDataException($"Slot '{slotStr}' does not match pattern");
            }

            return new TimeSlot {
                Day = (DayOfWeek)Enum.Parse(typeof(DayOfWeek), match.Groups[1].Value),
                StartHour = int.Parse(match.Groups[2].Value),
                StartMinute = int.Parse(match.Groups[3].Value),
                EndHour = int.Parse(match.Groups[4].Value),
                EndMinute = int.Parse(match.Groups[5].Value)
            };
        }

        protected override void OnModelCreating(ModelBuilder builder) {
            var valueComparer = new ValueComparer<List<TimeSlot>>(true);

            base.OnModelCreating(builder);
            builder.Entity<InternalDeliveryPoint>().Property(point => point.HoursList).HasConversion(
                v => string.Join(",", v.Select(p => $"{p.Day}[{p.StartHour}:{p.StartMinute}~{p.EndHour}:{p.EndMinute}]")),
                v => v.Split(",", StringSplitOptions.None).Select(HydrateTimeSlot).ToList(),
                valueComparer
            );
        }
    }
}
