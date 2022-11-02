using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class User
    {
        public User()
        {
            // Employees = new HashSet<Employee>();
        }

        public int UserId { get; set; }
        public string Username { get; set; } = null!;
        public byte[]? Password { get; set; }

        // public virtual Employee Employee { get; set; }
    }
}
