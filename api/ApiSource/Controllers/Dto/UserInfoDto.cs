namespace ApiSource.Controllers.Dto {
    public class UserInfoDto {
        public string Id { get; set; } = "";
        public string Name { get; set; } = "";
        public string? Email { get; set; } = null;
        public string PhoneNumber { get; set; } = "";
        public DeliveryPointDto? DeliveryPoint { get; set; } = null;
    }
}
