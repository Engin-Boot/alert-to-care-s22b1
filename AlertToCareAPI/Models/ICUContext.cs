using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AlertToCareAPI.Models;

namespace AlertToCareAPI.Models
{
    public class ICUContext : DbContext
    {
        public ICUContext(DbContextOptions<ICUContext> options) : base(options)
        {
        }
        public DbSet<PatientData> PatientData { get; set; }
        public DbSet<AlertToCareAPI.Models.BedData> BedData { get; set; }
    }
}
