using backend.Models.HomeUtilities;

namespace backend.Models.Repository;

public interface IHomeRepository
{
    Task<Home> GetHome();
}