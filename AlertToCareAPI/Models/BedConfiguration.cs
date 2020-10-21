using System.ComponentModel.DataAnnotations;

namespace AlertToCareAPI.Models
{
    public class BedConfiguration
    {
        [Key]
        public int ConfigurationID { get; set; }
        public int Floor { get; set; }
        public string NoOfBed { get; set; }
        public string Layout { get; set; }
    }
}
