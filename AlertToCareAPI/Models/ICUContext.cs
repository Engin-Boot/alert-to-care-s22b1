using Microsoft.EntityFrameworkCore;

namespace AlertToCareAPI.Models
{
    public class ICUContext : DbContext
    {
        public ICUContext(DbContextOptions<ICUContext> options) : base(options)
        {
        }
        public DbSet<PatientData> PatientData { get; set; }
        public DbSet<AlertToCareAPI.Models.BedData> BedData { get; set; }
        public DbSet<BedConfiguration> BedConfiguration { get; set; }
    }
}
