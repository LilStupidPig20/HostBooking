using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HostBooking.Models.DBModels
{
    [Table("entries")]
    public class Entry : IDbEntity
    {
        [Key]
        public int IdEntry { get; set; }
        public int WhoTooked { get; set; }
        public int WhichTable { get; set; }
        public DateTime RecordTime { get; set; }

        public Entry(int idEntry, int whoTooked, int whichTable, DateTime recordTime)
        {
            IdEntry = idEntry;
            WhoTooked = whoTooked;
            WhichTable = whichTable;
            RecordTime = recordTime;
        }
    }
}