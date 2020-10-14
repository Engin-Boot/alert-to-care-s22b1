using System.ComponentModel.DataAnnotations;

namespace AlertToCareAPI.Models
{
    public class BedConfiguration
    {
        [Key]
        public string NoOfBeds { get; set; }
    }
}
