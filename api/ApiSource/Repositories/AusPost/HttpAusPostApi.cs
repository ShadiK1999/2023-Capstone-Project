namespace ApiSource.Repositories.AusPost {
    public class HttpAusPostApi : AusPostApi {
        private const string AUSPOST_HTTP_CLIENT = "AusPost";
        private readonly IHttpClientFactory _httpClientFactory;

        public HttpAusPostApi(IHttpClientFactory httpClientFactory) {
            _httpClientFactory = httpClientFactory;
        }

        protected override async Task<Stream> GetResponseStream(string endpoint) {
            HttpClient client = _httpClientFactory.CreateClient(AUSPOST_HTTP_CLIENT);
            return await client.GetStreamAsync(endpoint);
        }
    }
}
