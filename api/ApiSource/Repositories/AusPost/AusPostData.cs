namespace ApiSource.Repositories.AusPost {
    public class AusPostGeoLocationsResult {
        public AusPostPoint[] Points { get; set; } = new AusPostPoint[0];
    }

    public class AusPostPoint {
        public int DeliveryPointId { get; set; } = 0;
        public string Name { get; set; } = "";
        public string Description { get; set; } = "";
        public Address Address { get; set; } = new Address();
        public LocationFrom GeoLocation { get; set; } = new LocationFrom();
        public List<Hours> Hours { get; set; } = new List<Hours>();
    }

    public class Address {
        public string AddressLine1 { get; set; } = "";
        public string AddressLine2 { get; set; } = "";
        public string AddressLine3 { get; set; } = "";
        public string CountryCode { get; set; } = "";
        public string CountryName { get; set; } = "";
        public int Postcode { get; set; } = 0;
        public string State { get; set; } = "";
        public string Suburb { get; set; } = "";
    }

    public class LocationFrom {
        public double Lat { get; set; } = 0;
        public double Lon { get; set; } = 0;
        public double Distance { get; set; } = 0;
    }

    public class Hours {
        public string EndDate { get; set; } = "";
        public string EndTime { get; set; } = "";
        public string StartDate { get; set; } = "";
        public string StartTime { get; set; } = "";
        public string Type { get; set; } = "";
        public int Weekday { get; set; } = 0;
    }
}
