using Microsoft.AspNetCore.Identity;

namespace ApiSource.Repositories.Neighbour {
    public class NeighbourUser : IdentityUser {
        public string DisplayName { get; set; } = "";
        public InternalDeliveryPoint? Point { get; set; }
    }
}
