using System.ComponentModel.DataAnnotations;

namespace AlertToCareAPI.Models
{
    public class BedConfiguration
    {
        [Key]
        public string NoOfBed { get; set; }
        public string Layout { get; set; }
    }
}
