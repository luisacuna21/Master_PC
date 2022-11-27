using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public partial class Customer
    {
        public Customer()
        {
            User = new();
        }

        public int CustomerId { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public int? UserId { get; set; }


        [NotMapped]
        public User User { get; set; }
        [NotMapped]
        public IEnumerable<Order> Orders { get; set; }
        [NotMapped]
        public IEnumerable<ShippingAddress> ShippingAddresses { get; set; }
    }
}
