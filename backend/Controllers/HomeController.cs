
using backend.Models.HomeUtilities;
using backend.Models.Repository;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[Route("api/home")]
[ApiController]
public class HomeController
{
    private readonly IHomeRepository _homeRepository;

    public HomeController(IHomeRepository homeRepository)
    {
        _homeRepository = homeRepository;
    }

    // GET: api/Home
    [HttpGet]
    public async Task<ActionResult<Home>> GetHome()
    {
        return await _homeRepository.GetHome();
        // if (home is null)
        //     return NotFound();
        // return home;
    }
}