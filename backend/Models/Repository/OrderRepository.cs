using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repository;

class OrderRepository : IOrderRepository
{
    private readonly MasterPCContext _context;

    public OrderRepository(MasterPCContext context)
    {
        _context = context;
    }

    public async Task<Order> Add(Order entity)
    {
        _context.Orders.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> Update(Order entity)
    {
        _context.Entry(entity).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!(await Exists(entity.OrderId)))
                return false;
            else
                throw;
        }
        return true;
    }

    public async Task<bool> Delete(int id)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order is null)
            return false;

        _context.Orders.Remove(order);

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Order>> GetAll()
    {
        return await _context.Orders.ToListAsync();
    }

    public async Task<Order> GetById(int id)
    {
        return await _context.Orders.FindAsync(id);
    }

    public async Task<bool> Exists(int id)
    {
        return await _context.Orders.AnyAsync(e => e.OrderId == id);
    }
}