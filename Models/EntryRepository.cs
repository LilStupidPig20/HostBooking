using Microsoft.EntityFrameworkCore;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace HostBooking.Models
{
    public class EntryRepository : IRepository
    {
        public void Insert(NpgsqlConnection dbCon, IDbEntity entity)
        {
            throw new NotImplementedException();
        }

        public void Update(NpgsqlConnection dbCon, IDbEntity entity)
        {
            throw new NotImplementedException();
        }

        public static List<Entry> GetEntriesByIdTable(ApplicationContext context, int idTable, DateTime date)
        {
            var entries = context.Entries.Where(a => a.WhichTable == idTable && date.Date == a.RecordTime.Date).ToList();
            return entries;
        }
        
        public static List<Entry> GetEntriesForUser(ApplicationContext context, int idUser)
        {
            var entries = context.Entries.Where(a => a.WhoTooked == idUser).ToList();
            return entries;
        }
        

        public static List<Entry> GetEntriesByIdUser(NpgsqlConnection dbCon, int idUser)
        {
            using(ApplicationContext db = new ApplicationContext())
            {
                var entries = db.Entries.Where(a => a.WhoTooked == idUser).ToList();
                return entries;
            }
        }
    }
}