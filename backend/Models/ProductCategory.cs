using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class ProductCategory
    {
        public ProductCategory()
        {
            // Products = new HashSet<Product>();
        }

        public int ProductCategoryId { get; set; }
        public string CategoryName { get; set; }

        // public ICollection<Product> Products { get; set; }
    }
}
