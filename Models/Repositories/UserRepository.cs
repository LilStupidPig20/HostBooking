using System;
using System.Linq;
using HostBooking.Models.Context;
using HostBooking.Models.DBModels;
using Npgsql;

namespace HostBooking.Models.Repositories
{
    public class UserRepository : IRepository
    {
        public void Insert(NpgsqlConnection dbCon, IDbEntity entity)
        {
            throw new NotImplementedException();
        }

        public void Update(NpgsqlConnection dbCon, IDbEntity entity)
        {
            throw new NotImplementedException();
        }

        public static bool IsAuth(ApplicationContext context, string login, string password)
        {
            try
            {
                var users = context.Users.OrderByDescending(a => a.UserId).ToList();
                Console.WriteLine(users[0]);
                return context.Users.Any(user => user.Login == login && user.Password == password);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
