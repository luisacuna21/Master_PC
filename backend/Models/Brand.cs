using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class Brand
    {
        public Brand()
        {
            // Products = new HashSet<Product>();
        }

        public int BrandId { get; set; }
        public string BrandName { get; set; }

        // public ICollection<Product> Products { get; set; }
    }
}
