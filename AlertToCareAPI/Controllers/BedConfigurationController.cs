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
    public class BedConfigurationController : ControllerBase
    {
        private readonly ICUContext _context;

        public BedConfigurationController(ICUContext context)
        {
            _context = context;
        }

        // GET: api/BedConfiguration
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BedConfiguration>>> GetBedConfiguration()
        {
            return await _context.BedConfiguration.ToListAsync();
        }

        // GET: api/BedConfiguration/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BedConfiguration>> GetBedConfiguration(int id)
        {
            var bedConfiguration = await _context.BedConfiguration.FindAsync(id);

            if (bedConfiguration == null)
            {
                return NotFound();
            }

            return bedConfiguration;
        }

        // PUT: api/BedConfiguration/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBedConfiguration(int id, BedConfiguration bedConfiguration)
        {
            if (id != bedConfiguration.ConfigurationID)
            {
                return BadRequest();
            }

            _context.Entry(bedConfiguration).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BedConfigurationExists(id))
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

        // POST: api/BedConfiguration
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<BedConfiguration>> PostBedConfiguration(BedConfiguration bedConfiguration)
        {
            _context.BedConfiguration.Add(bedConfiguration);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BedConfigurationExists(bedConfiguration.ConfigurationID ))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBedConfiguration", new { id = bedConfiguration.NoOfBed }, bedConfiguration);
        }

        // DELETE: api/BedConfiguration/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BedConfiguration>> DeleteBedConfiguration(int id)
        {
            var bedConfiguration = await _context.BedConfiguration.FindAsync(id);
            if (bedConfiguration == null)
            {
                return NotFound();
            }

            _context.BedConfiguration.Remove(bedConfiguration);
            await _context.SaveChangesAsync();

            return bedConfiguration;
        }

        private bool BedConfigurationExists(int id)
        {
            return _context.BedConfiguration.Any(e => e.ConfigurationID == id);
        }
    }
}
