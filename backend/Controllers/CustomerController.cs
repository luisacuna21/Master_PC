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
    [Route("api/customers")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomerController(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        // GET: api/Customer
        [HttpGet]
        public async Task<IEnumerable<Customer>> GetCustomers()
        {
            return await _customerRepository.GetAll();
        }

        // GET: api/Customer/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _customerRepository.GetById(id);
            if (customer is null)
                return NotFound();
            return customer;
        }

        // PUT: api/Customer/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> PutCustomer(int id, Customer Customer)
        {
            if (id != Customer.CustomerId)
                return BadRequest();

            return await _customerRepository.Update(Customer);
        }

        // POST: api/Customer
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Models.CustomerUtilities.CustomerSignUpRequest signUpRequest)
        {
            var customer = new Customer
            {
                FullName = signUpRequest.FullName,
                Email = signUpRequest.Email,
                City = signUpRequest.City,
                PostalCode = signUpRequest.PostalCode,
                Country = signUpRequest.Country,
                Phone = signUpRequest.Phone,
                UserId = signUpRequest.UserId
            };

            if (signUpRequest is null)
                return BadRequest();

            return Ok(await _customerRepository.Add(customer));
        }

        // DELETE: api/Customer/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteCustomer(int id)
        {
            return await _customerRepository.Delete(id);
        }

    }
}
