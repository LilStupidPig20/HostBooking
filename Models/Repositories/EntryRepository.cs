using System;
using System.Collections.Generic;
using System.Linq;
using HostBooking.Models.Context;
using HostBooking.Models.DBModels;
using Npgsql;

namespace HostBooking.Models.Repositories
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
    }
}