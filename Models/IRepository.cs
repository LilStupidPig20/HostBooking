using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HostBooking.Models
{
    interface IRepository
    {
        public void Insert(NpgsqlConnection dbCon, IDbEntity entity);
        public void Update(NpgsqlConnection dbCon, IDbEntity entity);
    }
}
