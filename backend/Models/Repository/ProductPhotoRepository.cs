using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repository;

public class ProductPhotoRepository : IProductPhotoRepository
{
    private readonly MasterPCContext _context;

    public ProductPhotoRepository(MasterPCContext context)
    {
        _context = context;
    }

    public Task<ProductPhoto> Add(ProductPhoto entity)
    {
        throw new NotImplementedException();
    }

    public Task<bool> Delete(int id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<ProductPhoto>> GetAll()
    {
        throw new NotImplementedException();
    }

    public Task<ProductPhoto> GetById(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<ProductPhoto>> GetProductPhotosByProductId(int productId)
    {
        return await _context.ProductPhotos.Where(p => p.ProductId == productId).ToListAsync();
    }

    public Task<bool> Update(ProductPhoto entity)
    {
        throw new NotImplementedException();
    }
}