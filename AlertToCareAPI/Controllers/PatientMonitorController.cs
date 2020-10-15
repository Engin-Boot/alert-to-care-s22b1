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
        public Dictionary<string,string> GetPatientData()
        {
            List<PatientData> patients =   _context.PatientData.ToList();
            Dictionary<string, string> keyValuePairs = new Dictionary<string, string>();
            foreach (var patient in patients)
            {
                if (patient.Spo2 == "unstable" || patient.Bpm == "unstable")
                    keyValuePairs.Add(patient.PatientID,"unstable");
            }
            return keyValuePairs;

        }

        [HttpGet("MONITOR/{id}")]
        public string GetVitalAlert(string id)
        {
            try 
            {

                var patientVitals = _context.PatientData.Find(id);
                string vitalCheck = "";
                if (patientVitals.Spo2 == "unstable" || patientVitals.Bpm == "unstable")
                    vitalCheck += "SPo2 is unstable" + " "+ "Or BPM is unstable";
                else
                    vitalCheck += "Everything Is Fine";
                return vitalCheck;
            }
            catch
            {
                return "Not a valid Patient ID";
            }
        }    
    }
}
