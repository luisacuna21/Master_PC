using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repository
{
    public class ShipperRepository : IShipperRepository
    {
        private readonly MasterPCContext _context;

        public ShipperRepository(MasterPCContext context)
        {
            _context = context;
        }

        public async Task<Shipper> Add(Shipper shipper)
        {
            _context.Shippers.Add(shipper);
            await _context.SaveChangesAsync();
            return shipper;
        }

        public async Task<bool> Update(Shipper shipper)
        {
            _context.Entry(shipper).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!(await Exists(shipper.ShipperId)))
                    return false;
                else
                    throw;
            }
            return true;
        }

        public async Task<bool> Delete(int id)
        {
            var shipper = await _context.Shippers.FindAsync(id);
            if (shipper is null)
                return false;

            _context.Shippers.Remove(shipper);

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Shipper>> GetAll()
        {
            return await _context.Shippers.ToListAsync();
        }

        public async Task<Shipper> GetById(int id)
        {
            return await _context.Shippers.FindAsync(id);
        }

        private async Task<bool> Exists(int id)
        {
            return await _context.Shippers.AnyAsync(e => e.ShipperId == id);
        }
    }
}