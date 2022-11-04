using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Orders = new HashSet<Order>();
            ShippingAdresses = new HashSet<ShippingAddress>();
        }

        public int CustomerId { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string City { get; set; } = null!;
        public string PostalCode { get; set; } = null!;
        public string Country { get; set; } = null!;
        public int? UserId { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<ShippingAddress> ShippingAdresses { get; set; }
    }
}
