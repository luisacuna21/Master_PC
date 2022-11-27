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
        var products = await _context.Products.ToListAsync();

        foreach (var p in products)
        {
            p.Brand = await _context.Brands.Where(b => b.BrandId == p.BrandId).FirstAsync();
            p.Category = await _context.ProductCategories.Where(pc => pc.ProductCategoryId == p.CategoryId).FirstAsync();
            p.FirstPhoto = await _context.ProductPhotos.Where(pp => pp.ProductId == p.ProductId).FirstAsync();
            // p.FirstPhoto.PhotoBase64 = Convert.ToBase64String(p.FirstPhoto.Photo);
        }

        // UpdateOldPhotos();
        // SaveBase64Photo();
        return products;
    }

    private void UpdateOldPhotos()
    {
        var photos = _context.ProductPhotos.Where(pp => pp.ProductPhotoId <= 21).ToList();

        photos.ForEach(p => p.PhotoBase64 = "data:image/jpg;base64," + p.PhotoBase64);

        _context.SaveChanges();
    }

    // private void SaveBase64Photo()
    // {
    //     var updated = false;
    //     var products = _context.Products.ToList();

    //     products.ForEach(p =>
    //     {
    //         p.ProductPhotos = _context.ProductPhotos.Where(pp => pp.ProductId == p.ProductId).ToList();
    //         p.ProductPhotos.ToList().ForEach(pp =>
    //         {
    //             pp.PhotoBase64 = Convert.ToBase64String(pp.Photo);
    //         });
    //         updated = this.Update(p).Result;
    //         Console.WriteLine(updated);
    //     });
    // }

    public async Task<Product> GetById(int id)
    {
        var product = await _context.Products.FindAsync(id);

        product.ProductPhotos = await _context.ProductPhotos.Where(pp => pp.ProductId == product.ProductId).ToListAsync();
        // product.ProductPhotos.ToList().ForEach(pp => pp.PhotoBase64 = Convert.ToBase64String(pp.Photo));

        return product;
        // return await _context.Products.FindAsync(id);
    }

    public async Task<bool> Exists(int id)
    {
        return await (_context.Products.AnyAsync(e => e.ProductId == id));
    }
}