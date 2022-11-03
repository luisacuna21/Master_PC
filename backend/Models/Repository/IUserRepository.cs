namespace backend.Models.Repository;

public interface IUserRepository : IRepository<User>
{
    // Task<User> GetByEmail(string email);
    Task<User> GetByUserName(string userName);
    Task<User> VerifyUser(string userName, string password);
}