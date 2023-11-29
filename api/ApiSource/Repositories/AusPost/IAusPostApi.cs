using ApiSource.Points;

namespace ApiSource.Repositories.AusPost {
    public interface IAusPostApi {
        public Task<List<ExternalDeliveryPoint>> GetGeoLocations(Coords center, int rangeKm);
    }
}
