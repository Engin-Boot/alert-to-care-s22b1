using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AlertToCareAPI.Models
{
    public class PatientData
    {
        [Key]
        public string PatientID { get; set; }
        public string Name { get; set; }
        public string BedId { get; set; }
        public ICUVitals Vitals { get; set; }
    }
}
