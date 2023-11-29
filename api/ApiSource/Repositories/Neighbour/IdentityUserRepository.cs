using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ApiSource.Repositories.Neighbour {
    public class IdentityUserRepository : IUserRepository {
        private UserManager<NeighbourUser> _userManager;
        private NeighbourContext _context;

        public IdentityUserRepository(UserManager<NeighbourUser> userManager, NeighbourContext context) {
            _userManager = userManager;
            _context = context;
        }

        public async Task<bool> CreateUser(string name, string email, string password, string phoneNumber) {
            NeighbourUser user = new() {
                DisplayName = name,
                UserName = email,
                Email = email,
                PhoneNumber = phoneNumber
            };
            var createResult = await _userManager.CreateAsync(user, password);
            return createResult.Succeeded;
        }

        public async Task<bool> DeleteUser(NeighbourUser user) {
            var result = await _userManager.DeleteAsync(user);
            return result.Succeeded;
        }

        public async Task<NeighbourUser?> GetUserByClaims(ClaimsPrincipal claims) {
            return await _userManager.GetUserAsync(claims);
        }

        public async Task<NeighbourUser?> GetUserById(string id) {
            return await _context.Users
                .Include(user => user.Point)
                .SingleOrDefaultAsync(user => user.Id == id);
        }

        public async Task<NeighbourUser?> GetUserByEmail(string email) {
            return await _context.Users
                .Include(user => user.Point)
                .SingleOrDefaultAsync(user => user.NormalizedEmail == email.ToUpper());
        }

        public async Task<bool> UpdateUser(NeighbourUser user) {
            var result = await _userManager.UpdateAsync(user);
            return result.Succeeded;
        }

        public async Task<bool> UpdatePassword(NeighbourUser user, string oldPassword, string newPassword) {
            var result = await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);
            return result.Succeeded;
        }

        public async Task<bool> ValidatePassword(NeighbourUser user, string password) {
            return await _userManager.CheckPasswordAsync(user, password);
        }
    }
}
