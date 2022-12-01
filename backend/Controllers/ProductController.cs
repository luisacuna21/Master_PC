using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Models.Repository;
using backend.Models.ProductUtilities;

namespace backend.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IProductPhotoRepository _productPhotoRepository;

        public ProductController(IProductRepository productRepository, IProductPhotoRepository productPhotoRepository)
        {
            _productRepository = productRepository;
            _productPhotoRepository = productPhotoRepository;
        }

        // GET: api/Product
        [HttpGet]
        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _productRepository.GetAll();
        }

        // [Route("products")]
        // [HttpGet("api/Product/{allPhotos}")]
        // [Route("firstPhoto")]
        // [HttpGet]
        // public async Task<IEnumerable<Product>> GetProductsWhitOnlyOnePhoto()
        // {
        //     return await _productRepository.GetAll();
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
        public async Task<ActionResult<Product>> PostProduct(InsertProductRequest productRequest)
        {
            if (productRequest is null)
                return BadRequest();

            var product = new Product
            {
                ProductName = productRequest.ProductName,
                ProductShortName = productRequest.ProductShortName,
                BrandId = productRequest.BrandId,
                CategoryId = productRequest.CategoryId,
                UnitPrice = productRequest.UnitPrice,
                UnitsInStock = productRequest.UnitsInStock,
                UnitsOnOrder = productRequest.UnitsOnOrder,
                ReorderLevel = productRequest.ReorderLevel,
                Discontinued = productRequest.Discontinued,
                ProductDescription = productRequest.ProductDescription,
            };

            var addedProduct = await _productRepository.Add(product);

            if (addedProduct is null)
                return Conflict("Product not inserted");

            var productPhotos = productRequest.ProductPhotos.Select(p => new ProductPhoto
            {
                ProductId = addedProduct.ProductId,
                PhotoBase64 = p.PhotoBase64
            }).ToList();

            var inserted = await _productPhotoRepository.AddMany(productPhotos);

            if (!inserted)
                Conflict("Product added but photos not");

            return CreatedAtAction("GetProduct", new { id = addedProduct.ProductId }, addedProduct);
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteProduct(int id)
        {
            return await _productRepository.Delete(id);
        }
    }
}
