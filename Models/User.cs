using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace HostBooking.Models
{
    [Table("users")]
    public class User : IDbEntity
    {
        [Key]
        public int? UserId { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        
        public User(int? userId, string login, string password, string surname, string name, string secondName)
        {
            UserId = userId;
            Login = login;
            Password = password;
            Surname = surname;
            Name = name;
            SecondName = secondName;
        }
    }
}
