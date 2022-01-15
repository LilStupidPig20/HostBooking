using HostBooking.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using HostBooking.Models.Context;
using HostBooking.Models.DBModels;
using HostBooking.Models.Repositories;
using Microsoft.EntityFrameworkCore;
using Npgsql.Replication.PgOutput.Messages;

namespace HostBooking.Controllers
{
    public class EntriesController : Controller
    {
        private ApplicationContext context;
        private const int MaxEntriesForTableInDay = 12;
        public EntriesController(ApplicationContext context)
        {
            this.context = context;
        }

        [HttpPut]
        public async Task<IActionResult> AddEntry(int whoTooked, int whichTable, List<DateTime> recordTime)
        {
            for (int i = 0; i < recordTime.Count; i++)
            {
                var entry = context.Entries.FirstOrDefault(a => a.WhoTooked == whoTooked
                                                                && a.RecordTime == recordTime[i]
                                                                && a.WhichTable == whichTable);
                if (entry != null)
                    return new BadRequestResult();
                var prevEntry = context.Entries.OrderByDescending(x => x.IdEntry).Take(1).FirstOrDefault();
                var prevId = prevEntry == null ? 1 : prevEntry.IdEntry;
                context.Entries.Add(new Entry(prevId + 1, whoTooked, whichTable, recordTime[i]));
                
            }
            await context.SaveChangesAsync();
            return new OkResult();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteEntry(int idEntry, int whoTooked, int whichTable, DateTime recordTime)
        {
            var entry = context.Entries.FirstOrDefault(a => a.IdEntry == idEntry);

            if (entry == null) 
                return new NotFoundResult();
            context.Entries.Remove(entry);
            await context.SaveChangesAsync();
            return new OkResult();
        }

        [HttpGet]
        public async Task<IActionResult> SearchTableInfoByIdTable(int idTable, DateTime date) 
        {
            var res = new List<Entry>();
            res = EntryRepository.GetEntriesByIdTable(context, idTable, date);
            if (res != null)
                return Json(res);
            return new EmptyResult();
        }

        [HttpGet]
        public async Task<IActionResult> GetEntriesForUser(int idUser) 
        {
            var id = new List<Entry>();
            id = EntryRepository.GetEntriesForUser(context, idUser);
            if (id != null)
                return Json(id);
            return new EmptyResult();
        }
        
        [HttpGet]
        public async Task<IActionResult> GetHowBusyEachTableOnDate(DateTime date)
        {
            if (date.Date.CompareTo(DateTime.Today.Date) < 0)
                return new BadRequestResult();
            var tablesWithBusy = new Dictionary<int, string>();
            var allEntries = context.Entries.Where(a => a.RecordTime.Date == date.Date).ToList();
            for (var i = 1; i <= 10; i++)
            {
                var entriesForTable = allEntries.FindAll(a => a.WhichTable == i);
                var res = entriesForTable.Count == 0 ? "FullFree" :
                    entriesForTable.Count == MaxEntriesForTableInDay ? "FullBusy" : "PartiallyBusy";
                tablesWithBusy.Add(i, res);
            }
            return Json(tablesWithBusy);
        }
        
        [HttpGet]
        public IActionResult SearchWhoTookThisTimeOnThisTable()
        {
            //Todo
            throw new NotImplementedException();
        }
    }
}