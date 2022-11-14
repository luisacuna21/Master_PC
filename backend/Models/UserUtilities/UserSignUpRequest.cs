namespace backend.Models.UserUtilities;

public class UserSignUpRequest
{
    public string Username { get; set; }
    public string Password { get; set; }
    public bool IsEmployee { get; set; }
}