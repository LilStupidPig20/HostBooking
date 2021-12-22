using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace HostBooking.Models
{
    [Table("users")]
    public class User : IDbEntity
    {
        public User(int? userId, string login, string password, string surname, string name, string secondName)
        {
            UserId = userId;
            Login = login;
            Password = password;
            Surname = surname;
            Name = name;
            SecondName = secondName;
        }
    
        [Key]
        public int? UserId { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        
        // public User(string email, string password, string username, string phone, string role = "none", int? id = null)
        // {
        //     if (!IsLoginValid(email))
        //         throw new Exception("Invalid login");
        //     if (!IsPasswordValid(password))
        //         throw new Exception("Invalid password");
        //     if (!IsPhoneNumberValid(phone))
        //         throw new Exception("Invalid phone number");
        //     Email = email;
        //     Password = Encryptor.GetHashString(password);
        //     Username = username;
        //     Role = role;
        //     Phone = phone;
        //     Id = id;
        // }

        private static bool IsPhoneNumberValid(string phoneNumber)
        {
            return true;
        }

        private static bool IsLoginValid(string login)
        {
            return true;
        }

        private static bool IsPasswordValid(string password)
        {
            return password.Length >= 6;
        }
    }
}
