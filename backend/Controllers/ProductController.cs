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
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        // GET: api/Product
        // [HttpGet]
        // public async Task<IEnumerable<Product>> GetProducts()
        // {
        //     return await _productRepository.GetAll();
        // }

        [Route("verify")]
        [HttpGet("{allPhotos}")]
        public async Task<IEnumerable<Product>> GetProducts(bool allPhotos)
        {
            if (allPhotos)
                return await _productRepository.GetAll();
            else
                return await _productRepository.GetAllWithAllPhotos();
        }

        // // GET: api/Product/5
        // [HttpGet("{allPhotos}")]
        // public async Task<ActionResult<Product>> GetProduct(bool allPhotos)
        // {
        //     var product = await _productRepository.GetById(id);
        //     if (product is null)
        //         return NotFound();
        //     return product;
        // }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _productRepository.GetById(id);
            if (product is null)
                return NotFound();
            return product;
        }

        // PUT: api/Product/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> PutProduct(int id, Product product)
        {
            if (id != product.ProductId)
                return BadRequest();

            return await _productRepository.Update(product);
        }

        // POST: api/Product
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            if (product is null)
                return BadRequest();

            return await _productRepository.Add(product);
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteProduct(int id)
        {
            return await _productRepository.Delete(id);
        }
    }
}
