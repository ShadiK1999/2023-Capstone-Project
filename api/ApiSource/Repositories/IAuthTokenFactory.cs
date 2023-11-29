using ApiSource.Repositories.Neighbour;

namespace ApiSource.Repositories {
    public interface IAuthTokenFactory {
        string CreateToken(NeighbourUser user);
    }
}
