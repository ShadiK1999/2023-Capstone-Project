using ApiSource;

var builder = WebApplication.CreateBuilder(args);

// Read Docker secrets as configuration.
builder.Configuration.AddEnvironmentVariables("TRUSTEDNEIGHBOUR_");
if (builder.Configuration.GetValue<bool>("ReadDockerSecrets")) {
    builder.Configuration.AddKeyPerFile("/run/secrets");
}

// Add services to the container.
ServiceRegistrar.RegisterServices(builder.Services, builder.Configuration);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(SwaggerConfiguration.ConfigureSwaggerGen);

var app = builder.Build();
app.UseSwagger();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
