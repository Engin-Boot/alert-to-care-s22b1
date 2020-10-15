using System.ComponentModel.DataAnnotations;

namespace AlertToCareAPI.Models
{
    public class PatientData
    {
        [Key]
        public string PatientID { get; set; }
        public string Name { get; set; }
        public string DateOfBirth { get; set; }
        public string MobileNo { get; set; }
        public string BedID { get; set; }
        public string Spo2 { get; set; }
        public string Bpm { get; set; }

    }
}
