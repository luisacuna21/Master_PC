namespace backend.Models.Repository;

public interface IRepository <T> where T : class
{
    Task<IEnumerable<T>> GetAll();
    Task<T> GetById(int id);
    Task<T> Add(T entity);
    Task<bool> Update(T entity);
    Task<bool> Delete(int id);
    // Task<bool> Exists(int id);
}