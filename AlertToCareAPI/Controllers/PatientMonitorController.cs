using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
                if (patient.Spo2 == "unstable" || patient.Bpm == "unstable" || patient.BodyTemp == "unstable" || patient.PulseRate == "unstable")
                    keyValuePairs.Add(patient.PatientID,"unstable");
            }
            return keyValuePairs;

        }

        [HttpGet("MONITOR/{id}")]
        public string GetVitalAlert(string id)
        {
            var patientVitals = _context.PatientData.Find(id);
            string vitalCheck = "";
            if (patientVitals.Spo2 == "unstable")
                vitalCheck += "SPo2 is unstable";

            if (patientVitals.BodyTemp == "unstable")
                vitalCheck += "Body Temperature is unstable";
            if (patientVitals.Bpm == "unstable")
                vitalCheck += "BPM is unstable";
            else
                vitalCheck += "\nEverything Is Fine";
            return vitalCheck;
        }
    }
}
