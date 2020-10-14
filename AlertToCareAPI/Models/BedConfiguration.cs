using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AlertToCareAPI.Models
{
    public class BedConfiguration
    {
        [Key]
        public string NoOfBeds { get; set; }
    }
}
