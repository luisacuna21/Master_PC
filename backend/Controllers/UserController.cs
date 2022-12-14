using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Models.Repository;
using backend.Models.UserUtilities;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        // GET: api/User
        [HttpGet]
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _userRepository.GetAll();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _userRepository.GetById(id);
            if (user is null)
                return NotFound();
            return user;
        }

        // PUT: api/User/5
        // Set Password in PasswrodString property, to encrypt in Repository.
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> PutUser(int id, User user)
        {
            if (id != user.UserId)
                return BadRequest();

            return await _userRepository.Update(user);
        }

        // POST: api/User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(UserSignUpRequest userRequest)
        {
            if (userRequest is null)
                return BadRequest();

            var user = new User
            {
                Username = userRequest.Username,
                Password = userRequest.Password,
                IsEmployee = userRequest.IsEmployee
            };

            return Ok(await _userRepository.Add(user));
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteUser(int id)
        {
            return await _userRepository.Delete(id);
        }

        [HttpPost]
        [Route("verify")]
        public async Task<ActionResult> VerifyUser(LoginRequest request)
        {
            return Ok(await _userRepository.VerifyUser(request));
        }
    }
}
