using ApiSource.Points;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace ApiSource.Repositories.AusPost {
    public abstract partial class AusPostApi : IAusPostApi {
        private static readonly DayOfWeek[] WEEKDAYS = new DayOfWeek[] {
            DayOfWeek.Monday,
            DayOfWeek.Tuesday,
            DayOfWeek.Wednesday,
            DayOfWeek.Thursday,
            DayOfWeek.Friday,
            DayOfWeek.Saturday,
            DayOfWeek.Sunday
        };
        private readonly JsonSerializerOptions _serializerOptions;

        public AusPostApi() {
            _serializerOptions = new JsonSerializerOptions {
                PropertyNamingPolicy = new SnakeCaseNamingPolicy(),
                NumberHandling = JsonNumberHandling.AllowReadingFromString
            };
        }

        private async Task<T?> Get<T>(string endpoint, Dictionary<string, string> queryParams) {
            string paramsStr = string.Join('&', queryParams.Select(kvp => kvp.Key + "=" + kvp.Value));
            if (paramsStr.Length > 0) {
                endpoint += "?" + paramsStr;
            }

            return await Get<T>(endpoint);
        }


        private async Task<T?> Get<T>(string endpoint) {
            Stream responseStream = await GetResponseStream(endpoint);
            return await JsonSerializer.DeserializeAsync<T>(responseStream, _serializerOptions);
        }

        protected abstract Task<Stream> GetResponseStream(string endpoint);

        public async Task<List<ExternalDeliveryPoint>> GetGeoLocations(Coords center, int rangeKm) {
            var geoLocationsResult = await Get<AusPostGeoLocationsResult>(
                $"points/geo/{center.Longitude}/{center.Latitude}",
                new Dictionary<string, string>() {
                    { "radius", rangeKm.ToString() },
                    { "types", "UPL,PO,OS" },
                    { "limit", "10000" }
                }
            );

            if (geoLocationsResult == null) {
                return new List<ExternalDeliveryPoint>();
            }

            return geoLocationsResult.Points.Select(point => new ExternalDeliveryPoint(
                new Coords(point.GeoLocation.Lat, point.GeoLocation.Lon),
                $"{point.Address.AddressLine1}, {point.Address.Suburb} {point.Address.State} {point.Address.Postcode}",
                point.Hours
                    .Where(hours => hours.Type == "HOURS" || hours.Type == "SPECIAL_HOURS")
                    .Select(hours => {
                        try {
                            ParseAusPostTimeOfDay(hours.StartTime, out int startHour, out int startMinute);
                            ParseAusPostTimeOfDay(hours.EndTime, out int endHour, out int endMinute);
                            return new TimeSlot {
                                Day = WEEKDAYS[hours.Weekday],
                                StartHour = startHour,
                                StartMinute = startMinute,
                                EndHour = endHour,
                                EndMinute = endMinute
                            };
                        } catch (InvalidDataException) {
                            return new TimeSlot {
                                Day = WEEKDAYS[hours.Weekday],
                                StartHour = 0,
                                StartMinute = 0,
                                EndHour = 0,
                                EndMinute = 0
                            };
                        }
                    }).ToList()
            )).ToList();
        }

        [GeneratedRegex("^(\\d{2}):(\\d{2})(?::(\\d{2}))?$")]
        private static partial Regex AusPostTimeRegex();

        private static void ParseAusPostTimeOfDay(string ausPostTime, out int hour, out int minute) {
            Match match = AusPostTimeRegex().Match(ausPostTime);

            if (!match.Success) {
                throw new InvalidDataException($"AusPost time {ausPostTime} did not match expected format dd:dd(:dd).");
            }

            hour = int.Parse(match.Groups[1].Value);
            minute = int.Parse(match.Groups[2].Value);
        }

        public class SnakeCaseNamingPolicy : JsonNamingPolicy {
            public override string ConvertName(string name) {
                var builder = new StringBuilder();

                bool wasDigit = false;

                foreach (char c in name) {
                    if (char.IsUpper(c)) {
                        wasDigit = false;

                        if (builder.Length > 0) {
                            builder.Append('_');
                        }
                        builder.Append(char.ToLower(c));
                    } else if (char.IsDigit(c)) {
                        if (!wasDigit && builder.Length > 0) {
                            builder.Append('_');
                        }
                        builder.Append(c);
                        wasDigit = true;
                    } else {
                        wasDigit = false;
                        builder.Append(c);
                    }
                }

                return builder.ToString();
            }
        }
    }
}
