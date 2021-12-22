using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HostBooking
{
    public static class PostgresConn
    {

        public static NpgsqlConnection GetConn()
        {
            NpgsqlConnection conn =
                new NpgsqlConnection(
                    @"Server=ella.db.elephantsql.com; User Id=jmluhjvi; Password=IQ2k_i9cDXCvKo4daRFpu-jez5RjSriZ; Database=jmluhjvi");
            conn.Open();
            return conn;
        }
    }
}
