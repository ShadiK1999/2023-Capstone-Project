namespace ApiSource.Points {
    public struct Coords {
        public double Longitude { get; }
        public double Latitude { get; }

        public Coords(double latitude, double longitude) {
            Latitude = latitude;
            Longitude = longitude;
        }

        public double DistanceTo(Coords other) {
            return Haversine(this.Latitude, this.Longitude, other.Latitude, other.Longitude);
        }

        //Sourced from https://stackoverflow.com/a/60899418
        public static double Haversine(double lat1, double lon1, double lat2, double lon2) {
            double rad(double angle) => angle * 0.017453292519943295769236907684886127d; // = angle * Math.Pi / 180.0d
            double havf(double diff) => Math.Pow(Math.Sin(rad(diff) / 2d), 2); // = sin²(diff / 2)
            return 12745.6 * Math.Asin(Math.Sqrt(havf(lat2 - lat1) + Math.Cos(rad(lat1)) * Math.Cos(rad(lat2)) * havf(lon2 - lon1))); // earth radius 6.372.8km x 2 = 12745.6
        }
    }
}
