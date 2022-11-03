using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repository;

public class BrandRepository : IBrandRepository
{
    private readonly MasterPCContext _context;

    public BrandRepository(MasterPCContext context)
    {
        _context = context;
    }

    public async Task<Brand> Add(Brand entity)
    {
        _context.Brands.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> Update(Brand entity)
    {
        _context.Entry(entity).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!(await Exists(entity.BrandId)))
                return false;
            else
                throw;
        }
        return true;
    }

    public async Task<bool> Delete(int id)
    {
        var brand = await _context.Brands.FindAsync(id);
        if (brand is null)
            return false;

        _context.Brands.Remove(brand);

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Brand>> GetAll()
    {
        return await _context.Brands.ToListAsync();
    }

    public async Task<Brand> GetById(int id)
    {
        return await _context.Brands.FindAsync(id);
    }

    public async Task<bool> Exists(int id)
    {
        return await (_context.Brands.AnyAsync(e => e.BrandId == id));
    }
}