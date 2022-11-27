using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public partial class Product
    {
        public Product()
        {
            Brand = new Brand();
            Category = new ProductCategory();
        }

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
        public decimal? UnitPrice { get; set; }
        public short? UnitsInStock { get; set; }
        public short? UnitsOnOrder { get; set; }
        public short? ReorderLevel { get; set; }
        public bool Discontinued { get; set; }
        public string ProductDescription { get; set; }

        [NotMapped]
        public Brand Brand { get; set; }
        [NotMapped]
        public string ProductShortName { get; set; }
        [NotMapped]
        public ProductCategory Category { get; set; }
        [NotMapped]
        public IEnumerable<OrderDetail> OrderDetails { get; set; }
        [NotMapped]
        public IEnumerable<ProductPhoto> ProductPhotos { get; set; }
        [NotMapped]
        public ProductPhoto FirstPhoto { get; set; }
    }
}
