using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repository;

public class ProductCategoryRepository : IProductCategoryRepository
{
    private readonly MasterPCContext _context;

    public ProductCategoryRepository(MasterPCContext context)
    {
        _context = context;
    }

    public async Task<ProductCategory> Add(ProductCategory entity)
    {
        _context.ProductCategories.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> Update(ProductCategory entity)
    {
        _context.Entry(entity).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!(await Exists(entity.ProductCategoryId)))
                return false;
            else
                throw;
        }
        return true;
    }

    public async Task<bool> Delete(int id)
    {
        var productCategory = await _context.ProductCategories.FindAsync(id);
        if (productCategory is null)
            return false;

        _context.ProductCategories.Remove(productCategory);

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<ProductCategory>> GetAll()
    {
        return await _context.ProductCategories.ToListAsync();
    }

    public async Task<ProductCategory> GetById(int id)
    {
        return await _context.ProductCategories.FindAsync(id);
    }

    public async Task<bool> Exists(int id)
    {
        return await (_context.ProductCategories.AnyAsync(e => e.ProductCategoryId == id));
    }
}