using backend.Models.Security;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace backend.Models.Repository;

public class UserRepository : IUserRepository
{
    private readonly MasterPCContext _context;

    public UserRepository(MasterPCContext context)
    {
        _context = context;
    }

    // public async Task<User> Add(User entity)
    // {
    //     using (Aes aes = Aes.Create())
    //     {
    //         entity.Password = AesEncryption.EncryptStringToBytes_Aes(entity.PasswordString, aes.Key, aes.IV);
    //     }

    //     _context.Users.Add(entity);
    //     await _context.SaveChangesAsync();
    //     return entity;
    // }
    public async Task<User> Add(User entity)
    {
        var userId = new SqlParameter
        {
            ParameterName = "@UserId",
            SqlDbType = SqlDbType.Int,
            Direction = ParameterDirection.Output
        };

        await _context.Database.ExecuteSqlInterpolatedAsync($@"EXEC spI_User @Username={entity.Username}, @Password={entity.PasswordString}, @UserId={userId} OUTPUT");

        var outputId = (int)userId.Value;

        return new User { UserId = outputId };
    }

    public async Task<bool> Update(User entity)
    {
        var updatedParam = new SqlParameter
        {
            ParameterName = "@Updated",
            SqlDbType = SqlDbType.Int,
            Direction = ParameterDirection.Output
        };

        var rows = await _context.Database.
                ExecuteSqlInterpolatedAsync($@"EXEC spU_User @UserID={entity.UserId}, @Username={entity.Username}, 
                    @Password={entity.PasswordString}, @Updated={updatedParam} OUTPUT");

        // var updatedResultd = (int)updatedParam.Value;

        if (rows == 1)
            return true;
        else
            return false;
        // return (bool)updatedParam.Value;
    }

    // public async Task<bool> Update(User entity)
    // {
    //     using (Aes aes = Aes.Create())
    //     {
    //         entity.Password = AesEncryption.EncryptStringToBytes_Aes(entity.PasswordString, aes.Key, aes.IV);
    //     }

    //     _context.Entry(entity).State = EntityState.Modified;

    //     try
    //     {
    //         await _context.SaveChangesAsync();
    //     }
    //     catch (DbUpdateConcurrencyException)
    //     {
    //         if (!(await Exists(entity.UserId)))
    //             return false;
    //         else
    //             throw;
    //     }
    //     return true;
    // }

    public async Task<bool> Delete(int id)
    {
        var user = _context.Users.Find(id);
        if (user is null)
            return false;

        _context.Users.Remove(user);

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<User>> GetAll()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<User> GetById(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<User> GetByUserName(string userName)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Username == userName);
    }

    public Task<User> VerifyUser(string userName, string password)
    {
        // var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == userName);

        // if (user is null)
        //     return user;
        // // else (user is not null)
        // // {
        // using (Aes myAes = Aes.Create())
        // {
        //     var decryptedPassword = AesEncryption.DecryptStringFromBytes_Aes(user.Password, myAes.Key, myAes.IV);
        //     if (decryptedPassword != password)
        //         user.Password = null!;
        // }
        // // }
        // // return user.Password == password;
        // return user;
        return new Task<User>(() => new User());
    }

    public async Task<bool> Exists(int id)
    {
        return await (_context.Users.AnyAsync(e => e.UserId == id));
    }
}