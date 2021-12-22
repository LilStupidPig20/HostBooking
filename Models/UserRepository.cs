using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace HostBooking.Models
{
    public class UserRepository : IRepository
    {
        // public void Insert(NpgsqlConnection dbCon, IDbEntity entity)
        // {
        //     var user = entity as User;
        //     using (var con = PostgresConn.GetConn())
        //     {
        //         if (UserWithLoginExists(con, user.Email))
        //             throw new Exception("User exists");
        //     }
        //     var command = dbCon.CreateCommand();
        //     command.CommandType = CommandType.Text;
        //     command.CommandText =
        //         $"INSERT INTO \"public\".\"users\"(username, role, phone, password, email) VALUES ('{user.Username}', '{user.Role}', '{user.Phone}', '{user.Password}', '{user.Email}')";
        //     command.ExecuteNonQuery();
        // }


        public void Insert(NpgsqlConnection dbCon, IDbEntity entity)
        {
            throw new NotImplementedException();
        }

        public void Update(NpgsqlConnection dbCon, IDbEntity entity)
        {
            throw new NotImplementedException();
        }

        public IDbEntity GetById(NpgsqlConnection dbCon, int id)
        {
            throw new NotImplementedException();
        }

        public static bool IsAuth(string login, string password, NpgsqlConnection dbCon)
        {
            var passHash = Encryptor.GetHashString(password);
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText =
                $"select * from \"public\".\"users\" where login='{login}' and password='{password}'";
            var dataReader = command.ExecuteReader();
            if (!dataReader.HasRows)
                return false;

            return true;
        }

        public bool UserWithLoginExists(NpgsqlConnection dbCon, string login)
        {
            var command = dbCon.CreateCommand();
            command.CommandType = CommandType.Text;
            command.CommandText = $"SELECT FROM \"public\".\"users\" Where email='{login}';";
            var result = command.ExecuteReader();
            return result.HasRows;
        }
    }
}
