using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AlertToCareAPI.Models
{
    public class PatientData
    {
        [Key]
        public string PatientID { get; set; }
        public string Name { get; set; }
        public string DateOfBirth { get; set; }
        public string MobileNo { get; set; }
        
        public string Spo2 { get; set; }
        public string Bpm { get; set; }
        
        [ForeignKey("BedID")]
        public string BedID { get; set; }
    }
}
