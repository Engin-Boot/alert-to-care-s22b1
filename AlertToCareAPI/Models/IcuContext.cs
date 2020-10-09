using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AlertToCareAPI.Models
{
    public class IcuContext : DbContext
    {
        public IcuContext(DbContextOptions<IcuContext> options) : base(options)
        {
        }
        public DbSet<PatientData> PatientData { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PatientData>().ToTable("PatientData");
            
        }

    }
}

