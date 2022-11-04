using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repository;

public class ProductRepository : IProductRepository
{
    private readonly MasterPCContext _context;

    public ProductRepository(MasterPCContext context)
    {
        _context = context;
    }

    public async Task<Product> Add(Product entity)
    {
        _context.Products.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> Update(Product entity)
    {
        _context.Entry(entity).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!(await Exists(entity.ProductId)))
                return false;
            else
                throw;
        }
        return true;
    }

    public async Task<bool> Delete(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product is null)
            return false;

        _context.Products.Remove(product);

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Product>> GetAll()
    {
        return await _context.Products.ToListAsync();
    }

    public async Task<Product> GetById(int id)
    {
        return await _context.Products.FindAsync(id);
    }

    public async Task<bool> Exists(int id)
    {
        return await (_context.Products.AnyAsync(e => e.ProductId == id));
    }
}