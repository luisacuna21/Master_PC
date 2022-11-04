using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class ShippingAddress
    {
        public int ShippingAddressId { get; set; }
        public int CustomerId { get; set; }
        public string ShippinAddress { get; set; } = null!;
        public string AddressName { get; set; } = null!;
        public string City { get; set; } = null!;
        public string PostalCode { get; set; } = null!;
        public string Country { get; set; } = null!;
        public string Phone { get; set; } = null!;

        public virtual Customer Customer { get; set; } = null!;
    }
}
