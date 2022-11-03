using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public partial class User
    {
        public User()
        {
            // Customers = new HashSet<Customer>();
            // Employees = new HashSet<Employee>();
        }

        public int UserId { get; set; }
        public string Username { get; set; } = null!;
        public byte[] Password { get; set; }

        [NotMapped]
        public string PasswordString { get; set; } = null!;

        // public virtual ICollection<Customer> Customers { get; set; }
        // public virtual ICollection<Employee> Employees { get; set; }
    }

    // public class InsertUserResult
    // {
    //     public int UserId { get; set; }
    // }
}
