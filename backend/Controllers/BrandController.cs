using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Models.Repository;

namespace backend.Controllers
{
    [Route("api/brands")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandRepository _brandRepository;

        public BrandController(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }

        // GET: api/Brand
        [HttpGet]
        public async Task<IEnumerable<Brand>> GetBrands()
        {
            return await _brandRepository.GetAll();
        }

        // GET: api/Brand/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Brand>> GetBrand(int id)
        {
            var brand = await _brandRepository.GetById(id);
            if (brand is null)
                return NotFound();
            return brand;
        }

        // PUT: api/Brand/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> PutBrand(int id, Brand brand)
        {
            if (id != brand.BrandId)
                return BadRequest();

            return await _brandRepository.Update(brand);
        }

        // POST: api/Brand
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Brand>> PostBrand(Brand brand)
        {
            if (brand is null)
                return BadRequest();

            return await _brandRepository.Add(brand);
        }

        // DELETE: api/Brand/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteBrand(int id)
        {
            return await _brandRepository.Delete(id);
        }
    }
}
