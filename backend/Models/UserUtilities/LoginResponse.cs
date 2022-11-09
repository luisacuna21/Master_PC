namespace backend.Models.UserUtilities;

public class LoginResponse
{
    public int UserId { get; set; }
    public string Message { get; set; }
    public bool IsEmployee { get; set; }
}