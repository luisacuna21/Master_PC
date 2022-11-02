﻿using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Orders = new HashSet<Order>();
            ShippingAdresses = new HashSet<ShippingAdress>();
        }

        public int CustomerId { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string City { get; set; } = null!;
        public string PostalCode { get; set; } = null!;
        public string Country { get; set; } = null!;

        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<ShippingAdress> ShippingAdresses { get; set; }
    }
}
