using backend.Models.UserUtilities;

namespace backend.Models.Repository;

public interface IUserRepository : IRepository<User>
{
    // Task<User> GetByEmail(string email);
    Task<User> GetByUserName(string userName);
    Task<LoginResponse> VerifyUser(LoginRequest request);
}