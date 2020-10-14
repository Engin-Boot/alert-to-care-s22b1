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
        public string DateOfBirth { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public string BedID { get; set; }
        public string Spo2 { get; set; }
        public string BodyTemp { get; set; }
        public string Bpm { get; set; }
        public string PulseRate { get; set; }

    }
}
