using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using HostBooking.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace HostBooking.Models
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

        public static async Task<User> IsAuth(ApplicationContext context, LoginModel model)
        {
            var res = await context.Users.FirstOrDefaultAsync(u => u.Login == model.Login && u.Password == model.Password);
            return res;
        }
    }
}
