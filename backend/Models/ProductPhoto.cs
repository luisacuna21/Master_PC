using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public partial class ProductPhoto
    {
        public int ProductPhotoId { get; set; }
        public int ProductId { get; set; }
        [NotMapped]
        public string PhotoBase64 { get; set; }

        // public  Product Product { get; set; }
    }
}
