using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using AlertToCareAPI.Models;

namespace AlertToCareAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientMonitorController : ControllerBase
    {
        private readonly ICUContext _context;
        

        public PatientMonitorController(ICUContext context)
        {
            _context = context;
          
        }

        [HttpGet]
        public IEnumerable<PatientMonitor> GetVitalStatus()
        {
            List<PatientData> patients = _context.PatientData.ToList();
            List<PatientMonitor> _patientMonitor = new List<PatientMonitor>();
            foreach (var patient in patients)
            {
                if (CheckUnstableVitals(patient.Spo2,patient.Bpm))
                {
                    _patientMonitor.Add(new PatientMonitor { PatientID = patient.PatientID, vitalStatus = "unstable" });
                }
            }
            return _patientMonitor;

        }

        [HttpGet("MONITOR/{id}")]
        public IActionResult GetVitalAlert(string id)
        {
            try 
            {

                var patientVitals = _context.PatientData.Find(id);
                string vitalCheck = "";
                if (CheckUnstableVitals(patientVitals.Spo2,patientVitals.Bpm))
                    vitalCheck += "SPo2 is unstable" + " "+ "Or BPM is unstable";
                else
                    vitalCheck += "Everything Is Fine";
                return Ok(vitalCheck);
            }
            catch
            {
                return Ok("Not a valid Patient ID");
            }
        } 

        private bool CheckUnstableVitals(string spo2,string bpm)
        {
            return (spo2 == "unstable" || bpm == "unstable");
        }
        
      
    }
}
