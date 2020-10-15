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
                if (patient.Spo2 == "unstable" || patient.Bpm == "unstable")
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
                if (patientVitals.Spo2 == "unstable" || patientVitals.Bpm == "unstable")
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
    }
}
