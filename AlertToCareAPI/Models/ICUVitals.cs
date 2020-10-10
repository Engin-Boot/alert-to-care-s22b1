using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AlertToCareAPI.Models
{
    public class ICUVitals
    {
        [Key]
        public string PatientID { get; set; }
        public string Bpm { get; set; }
        public string Spo2 { get; set; }
        public string Pulse { get; set; }
        public string BodyTemp { get; set; }

    }
}
