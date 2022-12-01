namespace backend.Models.Repository
{
    public interface IProductPhotoRepository : IRepository<ProductPhoto>
    {
        Task<IEnumerable<ProductPhoto>> GetProductPhotosByProductId(int productId);

        Task<bool> AddMany(IEnumerable<ProductPhoto> productPhotos);
    }
}