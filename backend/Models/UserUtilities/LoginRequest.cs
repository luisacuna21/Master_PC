namespace backend.Models.UserUtilities;

public class LoginRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
}

// public partial class User
// {
//     [NotMapped]
//     public string PasswordString { get; set; }
//     [NotMapped]
//     public bool Loged { get; set; }
//     [NotMapped]
//     public string LoginMessage { get; set; }
// }