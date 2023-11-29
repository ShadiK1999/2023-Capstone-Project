using ApiSource.Repositories.Neighbour;
using System.Security.Claims;

namespace ApiSource.Repositories {
    public interface IUserRepository {
        Task<NeighbourUser?> GetUserById(string id);
        Task<NeighbourUser?> GetUserByEmail(string email);
        Task<NeighbourUser?> GetUserByClaims(ClaimsPrincipal claims);
        Task<bool> CreateUser(string name, string email, string password, string phoneNumber);
        Task<bool> UpdateUser(NeighbourUser user);
        Task<bool> DeleteUser(NeighbourUser user);
        Task<bool> ValidatePassword(NeighbourUser user, string password);
        Task<bool> UpdatePassword(NeighbourUser user, string oldPassword, string newPassword);
    }
}
