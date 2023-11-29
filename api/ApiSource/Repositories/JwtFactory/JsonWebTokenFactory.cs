using ApiSource.Repositories.Neighbour;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ApiSource.Repositories.JwtFactory {
    public class JsonWebTokenFactory : IAuthTokenFactory {
        private IConfiguration _jwtConfig;

        public JsonWebTokenFactory(IConfiguration config) {
            _jwtConfig = config.GetSection("JwtConfig");
        }


        public string CreateToken(NeighbourUser user) {
            var key = Encoding.UTF8.GetBytes(_jwtConfig["Secret"]!);
            SigningCredentials credentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha512Signature
            );

            JwtSecurityToken token = new(
                _jwtConfig["Issuer"],
                _jwtConfig["Audience"],
                new[] {
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email!),
                    new Claim(JwtRegisteredClaimNames.Name, user.DisplayName)
                },
                expires: DateTime.UtcNow.AddMinutes(_jwtConfig.GetValue<float>("ExpiresIn")),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
