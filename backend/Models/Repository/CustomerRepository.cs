using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repository;

public class CustomerRepository : ICustomerRepository
{
    private readonly MasterPCContext _context;

    public CustomerRepository(MasterPCContext context)
    {
        _context = context;
    }

    public async Task<Customer> Add(Customer entity)
    {
        _context.Customers.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> Update(Customer entity)
    {
        _context.Entry(entity).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!(await Exists(entity.CustomerId)))
                return false;
            else
                throw;
        }
        return true;
    }

    public async Task<bool> Delete(int id)
    {
        var customer = await _context.Customers.FindAsync(id);
        if (customer is null)
            return false;

        _context.Customers.Remove(customer);

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Customer>> GetAll()
    {
        var customers = await _context.Customers.ToListAsync();

        foreach (var c in customers)
        {
            c.User = await _context.Users.Where(u => u.UserId == c.UserId).FirstAsync();
        }
        return customers;
    }

    public async Task<Customer> GetById(int id)
    {
        return await _context.Customers.FindAsync(id);
    }

    public async Task<bool> Exists(int id)
    {
        return await (_context.Customers.AnyAsync(e => e.CustomerId == id));
    }
}