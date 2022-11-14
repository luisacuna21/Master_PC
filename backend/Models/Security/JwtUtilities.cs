using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace backend.Models.Security;

public class JwtUtilities
{
    public static string GenerateToken(User user){
        Console.WriteLine("Generating Token");

        var claims = new[]{
            new Claim(JwtRegisteredClaimNames.Sub, "Subject"),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
            new Claim("Id", user.UserId.ToString()),
            new Claim("Name", user.Username),
            new Claim("IsEmployee", user.IsEmployee.ToString())
        };

        string secretKey = Environment.GetEnvironmentVariable("USER_SECRET");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

        var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: "https://localhost:5001",
            audience: "https://localhost:5001",
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(30),
            signingCredentials: signingCredentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public ulong? ValidateToken(string token){
        if(token == null){
            return null;
        }

        var tokenHandler = new JwtSecurityTokenHandler();

        string secretKey = Environment.GetEnvironmentVariable("USER_SECRET");

        // var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var key = Encoding.ASCII.GetBytes(secretKey);

        try
        {
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            var userId = ulong.Parse(jwtToken.Claims.First(x => x.Type == "Id").Value);

            return userId;
        }
        catch (System.Exception e)
        {
            Console.WriteLine(e.Message);
            return null;
        }
    }
}