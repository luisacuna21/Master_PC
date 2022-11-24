using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class ProductPhoto
    {
        public int ProductPhotoId { get; set; }
        public int ProductId { get; set; }
        public byte[] Photo { get; set; }

        // public virtual Product Product { get; set; }
    }
}
