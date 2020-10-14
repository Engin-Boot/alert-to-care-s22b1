using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AlertToCareAPI.Models;

namespace AlertToCareAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientDataController : ControllerBase
    {
        private readonly ICUContext _context;

        public PatientDataController(ICUContext context)
        {
            _context = context;
        }

        // GET: api/PatientData
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatientData>>> GetPatientData()
        {
            return await _context.PatientData.ToListAsync();
        }

        // GET: api/PatientData/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PatientData>> GetPatientData(string id)
        {
            var patientData = await _context.PatientData.FindAsync(id);

            if (patientData == null)
            {
                return NotFound();
            }

            return patientData;
        }

        
        // PUT: api/PatientData/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPatientData(string id, PatientData patientData)
        {
            if (id != patientData.PatientID)
            {
                return BadRequest();
            }

            _context.Entry(patientData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PatientDataExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PatientData
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PatientData>> PostPatientData(PatientData patientData)
        {
            _context.PatientData.Add(patientData);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PatientDataExists(patientData.PatientID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            var bedId = _context.PatientData.Find(patientData.PatientID).BedID;
            var bedList = _context.BedData.ToList();
            foreach (var bed in bedList)
            {
                if (bed.BedID == bedId)
                {
                    bed.OccupancyStatus = "Occupied";
                }
            }
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPatientData", new { id = patientData.PatientID }, patientData);
        }

        // DELETE: api/PatientData/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PatientData>> DeletePatientData(string id)
        {
            var patientData = await _context.PatientData.FindAsync(id);
            if (patientData == null)
            {
                return NotFound();
            }

            var bedId = _context.PatientData.Find(id).BedID;
            var bedList = _context.BedData.ToList();
            foreach(var bed in bedList)
            {
                if(bed.BedID == bedId)
                {
                    bed.OccupancyStatus = "Vacant";
                }
            }
            _context.PatientData.Remove(patientData);
            await _context.SaveChangesAsync();

            return patientData;
        }

        private bool PatientDataExists(string id)
        {
            return _context.PatientData.Any(e => e.PatientID == id);
        }
    }
}
