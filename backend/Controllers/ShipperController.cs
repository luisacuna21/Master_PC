using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Models.Repository;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShipperController : ControllerBase
    {
        private readonly IShipperRepository _shipperRepository;

        public ShipperController(IShipperRepository shipperRepository)
        {
            _shipperRepository = shipperRepository;
        }

        // GET: api/Shipper
        [HttpGet]
        public async Task<IEnumerable<Shipper>> GetShippers()
        {
            return await _shipperRepository.GetAll();
        }

        // GET: api/Shipper/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Shipper>> GetShipper(int id)
        {
            var Shipper = await _shipperRepository.GetById(id);
            if (Shipper is null)
                return NotFound();
            return Shipper;
        }

        // PUT: api/Shipper/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> PutShipper(int id, Shipper shipper)
        {
            if (id != shipper.ShipperId)
                return BadRequest();

            return await _shipperRepository.Update(shipper);
        }

        // POST: api/Shipper
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Shipper>> PostShipper(Shipper Shipper)
        {
            if (Shipper is null)
                return BadRequest();

            return await _shipperRepository.Add(Shipper);
        }

        // DELETE: api/Shipper/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteShipper(int id)
        {
            return await _shipperRepository.Delete(id);
        }
    }
}
