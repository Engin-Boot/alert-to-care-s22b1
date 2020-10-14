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
    public class BedDatasController : ControllerBase
    {
        private readonly ICUContext _context;

        public BedDatasController(ICUContext context)
        {
            _context = context;
            
        }

        // GET: api/BedDatas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BedData>>> GetBedData()
        {
            return await _context.BedData.ToListAsync();

        }

        /*[HttpGet("{NoOfbed}")]
        public string GetTotalNoOfBedData()
        {
            var values = ConfigurationManager.AppSettings["NoOfBed"];
            return values;

        }*/
        // GET: api/BedDatas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BedData>> GetBedData(string id)
        {
            var bedData = await _context.BedData.FindAsync(id);

            if (bedData == null)
            {
                return NotFound();
            }

            return bedData;
        }

        //get: api/BedDatas/status/209
        [HttpGet("status/{id}")]
        public string GetBedStatus(string id)
        {
            return _context.BedData.Find(id).OccupancyStatus;
            
        }

        // PUT: api/BedDatas/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBedData(string id, BedData bedData)
        {
            if (id != bedData.BedID)
            {
                return BadRequest();
            }

            _context.Entry(bedData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BedDataExists(id))
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

        // POST: api/BedDatas
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<BedData>> PostBedData(BedData bedData)
        {
            _context.BedData.Add(bedData);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BedDataExists(bedData.BedID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBedData", new { id = bedData.BedID }, bedData);
        }

        // DELETE: api/BedDatas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BedData>> DeleteBedData(string id)
        {
            var bedData = await _context.BedData.FindAsync(id);
            if (bedData == null)
            {
                return NotFound();
            }

            _context.BedData.Remove(bedData);
            await _context.SaveChangesAsync();

            return bedData;
        }

        private bool BedDataExists(string id)
        {
            return _context.BedData.Any(e => e.BedID == id);
        }
    }
}
