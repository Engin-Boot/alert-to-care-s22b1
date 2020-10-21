using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AlertToCareAPI.Models
{
    public class BedData
    {
        [Key]
        public string BedID { get; set; }

        [ForeignKey("BedConfigurationID")]
        public int BedConfigurationID { get; set; }
        public string Department { get; set; }
        public string OccupancyStatus { get; set; }

    }
}
