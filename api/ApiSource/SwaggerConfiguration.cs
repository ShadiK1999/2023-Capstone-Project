using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace ApiSource {
    public static class SwaggerConfiguration {
        public static void ConfigureSwaggerGen(SwaggerGenOptions options) {
            options.SwaggerDoc("v1", new OpenApiInfo {
                Title = "Trusted Neighbour API - V1",
                Version = "v1",
                Description = "An API to retrieve safe parcel delivery locations."
            });
            options.CustomSchemaIds((type) => {
                if (type.Name.EndsWith("Dto")) {
                    return type.Name.Remove(type.Name.Length - 3, 3);
                } else {
                    return type.Name;
                }
            });
            options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, "ApiSource.xml"));
            options.UseOneOfForPolymorphism();
            options.EnableAnnotations(enableAnnotationsForInheritance: true, enableAnnotationsForPolymorphism: true);

            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme {
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Description = "JWT authorization header using the Bearer scheme."
            });
        }
    }
}
