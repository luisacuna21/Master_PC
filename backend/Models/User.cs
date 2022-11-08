using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public partial class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public byte[] Password { get; set; }

        public virtual Customer Customer { get; set; }
        public virtual Employee Employee { get; set; }
    }

    public partial class User
    {
        [NotMapped]
        public string PasswordString { get; set; }
        [NotMapped]
        public bool Loged { get; set; }
        [NotMapped]
        public string LoginMessage { get; set; }
    }
}
