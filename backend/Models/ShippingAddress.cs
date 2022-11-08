using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class ShippingAddress
    {
        public int ShippingAddressId { get; set; }
        public int CustomerId { get; set; }
        public string ShippinAddress { get; set; }
        public string AddressName { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }

        public virtual Customer Customer { get; set; }
    }
}
