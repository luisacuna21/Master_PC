using System;
using System.Collections.Generic;

namespace backend.Models
{
    public partial class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public DateTime BirthDate { get; set; }
        public string IdentificationNumber { get; set; } = null!;
        public DateTime HireDate { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Phone { get; set; }
        public int? UserId { get; set; }
        public string Email { get; set; } = null!;

        public virtual User User { get; set; }
    }
}
