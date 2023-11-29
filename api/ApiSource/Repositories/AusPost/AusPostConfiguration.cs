namespace ApiSource.Repositories.AusPost {
    public class AusPostConfiguration {
        public string? ApiKey { get; }

        public AusPostConfiguration(IConfiguration? config) {
            if (config != null) {
                ApiKey = config.GetValue<string>("AusPostApiKey");
            }
        }
    }
}
