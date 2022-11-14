namespace backend.Models.CustomerUtilities;

public class CustomerSignUpRequest
{
    public string FullName { get; set; }
    public string Email { get; set; }
    public string City { get; set; }
    public string PostalCode { get; set; }
    public string Country { get; set; }
    public string Phone { get; set; }
    public int UserId { get; set; }
}
