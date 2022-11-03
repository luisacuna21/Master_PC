using Microsoft.EntityFrameworkCore;

namespace backend.Models.Repository;

public class EmployeeRepository : IEmployeeRepository
{
    private readonly MasterPCContext _context;

    public EmployeeRepository(MasterPCContext context)
    {
        _context = context;
    }

    public async Task<Employee> Add(Employee entity)
    {
        _context.Employees.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> Update(Employee entity)
    {
        _context.Entry(entity).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if(!(await Exists(entity.EmployeeId)))
                return false;
            else
                throw;
        }
        return true;
    }

    public async Task<bool> Delete(int id)
    {
        var employee = await _context.Employees.FindAsync(id);
        if(employee is null)
            return false;

        _context.Employees.Remove(employee);
        
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<Employee>> GetAll()
    {
        return await _context.Employees.ToListAsync();
    }

    public async Task<Employee> GetById(int id)
    {
        return await _context.Employees.FindAsync(id);
    }

        public async Task<bool> Exists(int id)
    {
        return await (_context.Employees.AnyAsync(e => e.EmployeeId == id));
    }
}