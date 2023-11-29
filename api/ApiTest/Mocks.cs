using ApiSource.Repositories;
using ApiSource.Repositories.Neighbour;
using System.Security.Claims;

namespace ApiTest {
    public class MockTokenFactory : IAuthTokenFactory {
        public Func<NeighbourUser, string>? CreateTokenImpl { get; set; }

        public string CreateToken(NeighbourUser user) {
            return CreateTokenImpl == null ? "" : CreateTokenImpl(user);
        }
    }

    public class MockUserRepository : IUserRepository {
        public Func<string, string, string, string, bool>? CreateUserImpl { get; set; }
        public Func<NeighbourUser, bool>? DeleteUserImpl { get; set; }
        public Func<ClaimsPrincipal, NeighbourUser?>? GetUserByClaimsImpl { get; set; }
        public Func<string, NeighbourUser?>? GetUserByEmailImpl { get; set; }
        public Func<string, NeighbourUser?>? GetUserByIdImpl { get; set; }
        public Func<NeighbourUser, string, string, bool>? UpdatePasswordImpl { get; set; }
        public Func<NeighbourUser, bool>? UpdateUserImpl { get; set; }
        public Func<NeighbourUser, string, bool>? ValidatePasswordImpl { get; set; }

        public virtual Task<bool> CreateUser(string name, string email, string password, string phoneNumber) {
            return Task.FromResult(CreateUserImpl == null || CreateUserImpl(name, email, password, phoneNumber));
        }

        public virtual Task<bool> DeleteUser(NeighbourUser user) {
            return Task.FromResult(DeleteUserImpl == null || DeleteUserImpl(user));
        }

        public virtual Task<NeighbourUser?> GetUserByClaims(ClaimsPrincipal claims) {
            return Task.FromResult(GetUserByClaimsImpl?.Invoke(claims));
        }

        public virtual Task<NeighbourUser?> GetUserByEmail(string email) {
            return Task.FromResult(GetUserByEmailImpl?.Invoke(email));
        }

        public virtual Task<NeighbourUser?> GetUserById(string id) {
            return Task.FromResult(GetUserByIdImpl?.Invoke(id));
        }

        public virtual Task<bool> UpdatePassword(NeighbourUser user, string oldPassword, string newPassword) {
            return Task.FromResult(UpdatePasswordImpl == null || UpdatePasswordImpl(user, oldPassword, newPassword));
        }

        public virtual Task<bool> UpdateUser(NeighbourUser user) {
            return Task.FromResult(UpdateUserImpl == null || UpdateUserImpl(user));
        }

        public virtual Task<bool> ValidatePassword(NeighbourUser user, string password) {
            return Task.FromResult(ValidatePasswordImpl == null || ValidatePasswordImpl(user, password));
        }
    }
}
