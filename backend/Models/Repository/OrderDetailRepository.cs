using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repository
{
    public class OrderDetailRepository : IOrderDetailRepository
    {
        private readonly MasterPCContext _context;

        public OrderDetailRepository(MasterPCContext context)
        {
            _context = context;
        }

        public async Task<OrderDetail> Add(OrderDetail entity)
        {
            _context.OrderDetails.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> Update(OrderDetail entity)
        {
            _context.Entry(entity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!(await Exists(entity.OrderDetailId)))
                    return false;
                else
                    throw;
            }
            return true;
        }

        public async Task<bool> Delete(int id)
        {
            var customer = await _context.OrderDetails.FindAsync(id);
            if (customer is null)
                return false;

            _context.OrderDetails.Remove(customer);

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<OrderDetail>> GetAll()
        {
            return await _context.OrderDetails.ToListAsync();
        }

        public async Task<OrderDetail> GetById(int id)
        {
            return await _context.OrderDetails.FindAsync(id);
        }

        public async Task<bool> Exists(int id)
        {
            return await (_context.OrderDetails.AnyAsync(e => e.OrderDetailId == id));
        }
    }
}