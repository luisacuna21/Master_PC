using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public partial class User
    {
        public User()
        {
            // Customer = new();
            // Employee = new();
        }

        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool IsEmployee { get; set; }

        // [NotMapped]
        // public Customer Customer { get; set; }
        // [NotMapped]
        // public Employee Employee { get; set; }
    }
}
