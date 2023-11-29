namespace ApiSource.Controllers.Dto {
    public class EditUserDto {
        public string? NameChange { get; set; }
        public PasswordChangeDto? PasswordChange { get; set; }
        public string? PhoneNumberChange { get; set; }
    }

    public class PasswordChangeDto {
        public string CurrentPassword { get; set; } = "";
        public string NewPassword { get; set; } = "";
    }
}
