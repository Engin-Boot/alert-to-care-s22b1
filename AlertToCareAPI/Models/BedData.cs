using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AlertToCareAPI.Models
{
    public class BedData
    {
        [Key]
        public string BedID { get; set; }
        public string Floor { get; set; }
        public bool OccupancyStatus { get; set; }
        public string Department { get; set; }
    }
}
