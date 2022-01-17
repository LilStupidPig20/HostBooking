using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HostBooking.Models.DBModels
{
    [Table("users")]
    public class User : IDbEntity
    {
        [Key]
        public string UserId { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string SecondName { get; set; }
        
        public User(string userId, string login, string password, string surname, string name, string secondName)
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
