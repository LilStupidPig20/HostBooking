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
using Microsoft.EntityFrameworkCore;

namespace HostBooking.Controllers
{
    public class EntriesController : Controller
    {
        private ApplicationContext context;
        public EntriesController(ApplicationContext context)
        {
            this.context = context;
        }
        
        [HttpPut]
        public IActionResult AddEntry(int idUser, DateTime recordTime, int whichTable) //alexei
        {
            //todo
            throw new NotImplementedException();
        }

        [HttpDelete]
        public IActionResult DeleteEntry(int idEntry) //alexei
        {
            //todo
            throw new NotImplementedException();
        }

        [HttpGet]
        public IActionResult SearchTableInfoByIdTable(int idTable) //id стола
        {
            var res = new List<Entry>();
            
            res = EntryRepository.GetEntriesByIdTable(context, idTable);
            
            if (res != null)
                return Json(res);
            return Json("XUI");
        }

        [HttpGet]
        public IActionResult GetEntriesForUser(int idUser) //artyom
        {
            //todo
            throw new NotImplementedException();
        }

        public IActionResult GetFreeTableByDate(DateTime date) //alexei
        {
            //Todo return Dictionary<IdTable, {1, 2, 3}>;
            //1 - cвободно полностью, 2 - есть свободные, 3 - занято
            throw new NotImplementedException();
        }
        
        public IActionResult SearchWhoTookThisTimeOnThisTable() //artyom
        {
            //Todo
            throw new NotImplementedException();
        }
    }
}