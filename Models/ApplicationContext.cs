using HostBooking.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Npgsql;

namespace HostBooking.Models
{
    public partial class ApplicationContext : DbContext
    {
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Entry> Entries { get; set; }

        public ApplicationContext()
        {
        }
 
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
        }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("Server=ella.db.elephantsql.com; User Id=jmluhjvi; Password=IQ2k_i9cDXCvKo4daRFpu-jez5RjSriZ; Database=jmluhjvi");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            OnModelCreatingPartial(modelBuilder);
        }
 
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}