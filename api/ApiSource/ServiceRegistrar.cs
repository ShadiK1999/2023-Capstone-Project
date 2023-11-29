using ApiSource.Controllers.Dto;
using ApiSource.Controllers.Dto.Conversion;
using ApiSource.Points;
using ApiSource.Repositories;
using ApiSource.Repositories.AusPost;
using ApiSource.Repositories.JwtFactory;
using ApiSource.Repositories.Neighbour;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using System.Text;

namespace ApiSource {
    public static class ServiceRegistrar {
        public static void RegisterServices(IServiceCollection services, IConfiguration config) {
            // Singleton services (one for the entire length of the application)
            services.AddSingleton<IExternalDeliveryPointRepository, AusPostDeliveryPointRepository>();
            services.AddSingleton<IAusPostApi, HttpAusPostApi>();
            services.AddSingleton<AusPostConfiguration>();
            services.AddSingleton<IAuthTokenFactory, JsonWebTokenFactory>();

            // Scoped services (new one each request)
            services.AddScoped<IUserRepository, IdentityUserRepository>();
            services.AddScoped<IInternalDeliveryPointRepository, NeighbourPointRepository>();

            // Dto services
            services.AddSingleton<IDtoBuilder<InternalDeliveryPoint, DeliveryPointDto>, DeliveryPointConverter>();
            services.AddSingleton<IDtoBuilder<ExternalDeliveryPoint, DeliveryPointDto>, DeliveryPointConverter>();
            services.AddSingleton<IDtoBuilder<TimeSlot, TimeSlotDto>, TimeSlotConverter>();
            services.AddSingleton<IDtoParser<TimeSlot, TimeSlotDto>, TimeSlotConverter>();
            services.AddSingleton<IDtoBuilder<Coords, CoordsDto>, CoordsConverter>();
            services.AddSingleton<IDtoParser<Coords, CoordsDto>, CoordsConverter>();
            services.AddSingleton<IDtoBuilder<NeighbourUser, UserInfoDto>, UserConverter>();

            // Service setup
            SetUpHttpClients(services, config);
            SetupDatabase(services, config);
            SetupAuthentication(services, config);
        }

        public static void SetUpHttpClients(IServiceCollection services, IConfiguration config) {
            services.AddHttpClient("AusPost", client => {
                client.BaseAddress = new Uri("https://digitalapi.auspost.com.au/locations/v2/");
            }).ConfigureHttpClient((serviceProvider, client) => {
                client.DefaultRequestHeaders.Add("AUTH-KEY", serviceProvider.GetRequiredService<AusPostConfiguration>().ApiKey);
            });
        }

        public static void SetupDatabase(IServiceCollection services, IConfiguration config) {
            services.AddDbContext<NeighbourContext>(options => {
                options.UseMySql(
                    config.GetConnectionString("NeighbourDb"),
                    ServerVersion.Create(Version.Parse("8.1.0"), ServerType.MySql)
                );
            });

            services.AddIdentityCore<NeighbourUser>(options => {
                options.User.RequireUniqueEmail = true;
                options.Password.RequiredLength = 6;

                options.SignIn.RequireConfirmedAccount = false;
                options.Password.RequireDigit = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
            }).AddEntityFrameworkStores<NeighbourContext>();
        }

        public static void SetupAuthentication(IServiceCollection services, IConfiguration config) {
            services.AddAuthentication(options => {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options => {
                options.TokenValidationParameters = new TokenValidationParameters() {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JwtConfig:Secret"] ?? ""))
                };
            });
        }
    }
}
