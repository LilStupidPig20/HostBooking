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

        [HttpPost]
        public async Task<IActionResult> AddEntry(int whoTooked, int whichTable, List<DateTime> recordTimes)
        {
            foreach (var e in recordTimes)
            {
                var entry = context.Entries.FirstOrDefault(a => a.WhoTooked == whoTooked
                                                                && a.WhichTable == whichTable
                                                                && a.RecordTime == e);
                if (entry != null)
                    return new BadRequestResult();
            }

            var prevEntry = context.Entries.OrderByDescending(x => x.IdEntry).Take(1).FirstOrDefault();
            var prevId = prevEntry == null ? 1 : prevEntry.IdEntry;
            for (var i = 0; i < recordTimes.Count; i++)
                context.Entries.Add(new Entry(prevId + i + 1, whoTooked, whichTable, recordTimes[i]));
            await context.SaveChangesAsync();
            return new OkResult();
        }
        
        public async Task<IActionResult> RepeatForAWeekAddEntry(int whoTooked, int whichTable, List<DateTime> recordTimes)
        {
            foreach (var e in recordTimes)
            {
                var entry = context.Entries.FirstOrDefault(a => a.WhoTooked == whoTooked
                                                                && a.WhichTable == whichTable
                                                                && a.RecordTime == e);
                if (entry != null)
                    return new BadRequestResult();
            }

            for (int i = 0; i < recordTimes.Count; ++i)
            {
                recordTimes[i] = recordTimes[i].AddDays(7);
            }

            var prevEntry = context.Entries.OrderByDescending(x => x.IdEntry).Take(1).FirstOrDefault();
            var prevId = prevEntry == null ? 1 : prevEntry.IdEntry;
            for (var i = 0; i < recordTimes.Count; i++)
                context.Entries.Add(new Entry(prevId + i + 1, whoTooked, whichTable, recordTimes[i]));
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
        public async Task<IActionResult> GetLastEntries(int idUser)
        {
            var res = context.Entries
                .Where(a => a.WhoTooked == idUser && a.RecordTime.CompareTo(DateTime.Now) < 0).ToList();
            if (res.Count <= 0)
                return new NotFoundResult();
            return Json(res);
        }
        
        [HttpGet]
        public async Task<IActionResult> GetUpcomingEntries(int idUser)
        {
            var res = context.Entries
                .Where(a => a.WhoTooked == idUser && a.RecordTime.CompareTo(DateTime.Now) >= 0).ToList();
            if (res.Count <= 0)
                return new NotFoundResult();
            return Json(res);
        }
    }
}