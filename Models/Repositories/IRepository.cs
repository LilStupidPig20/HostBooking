using HostBooking.Models.DBModels;
using Npgsql;

namespace HostBooking.Models.Repositories
{
    interface IRepository
    {
        public void Insert(NpgsqlConnection dbCon, IDbEntity entity);
        public void Update(NpgsqlConnection dbCon, IDbEntity entity);
    }
}
