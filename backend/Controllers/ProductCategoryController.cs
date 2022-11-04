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
    [Route("api/[controller]")]
    [ApiController]
    public class ProductCategoryController : ControllerBase
    {
        private readonly IProductCategoryRepository _productCategoryRepository;

        public ProductCategoryController(IProductCategoryRepository productCategoryRepository)
        {
            _productCategoryRepository = productCategoryRepository;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<IEnumerable<ProductCategory>> GetProducts()
        {
            return await _productCategoryRepository.GetAll();
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductCategory>> GetProduct(int id)
        {
            var productCategory = await _productCategoryRepository.GetById(id);
            if (productCategory is null)
                return NotFound();
            return productCategory;
        }

        // PUT: api/Product/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> PutProduct(int id, ProductCategory productCategory)
        {
            if (id != productCategory.ProductCategoryId)
                return BadRequest();

            return await _productCategoryRepository.Update(productCategory);
        }

        // POST: api/Product
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductCategory>> PostProduct(ProductCategory productCategory)
        {
            if (productCategory is null)
                return BadRequest();

            return await _productCategoryRepository.Add(productCategory);
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteProduct(int id)
        {
            return await _productCategoryRepository.Delete(id);
        }
    }
}
