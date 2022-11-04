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
    public class OrderDetailController : ControllerBase
    {
        private readonly IOrderDetailRepository _orderDetailRepository;

        public OrderDetailController(IOrderDetailRepository orderDetailRepository)
        {
            _orderDetailRepository = orderDetailRepository;
        }

        // GET: api/OrderDetail
        [HttpGet]
        public async Task<IEnumerable<OrderDetail>> GetOrderDetails()
        {
            return await _orderDetailRepository.GetAll();
        }

        // GET: api/OrderDetail/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDetail>> GetOrderDetail(int id)
        {
            var product = await _orderDetailRepository.GetById(id);
            if (product is null)
                return NotFound();
            return product;
        }

        // PUT: api/OrderDetail/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> PutOrderDetail(int id, OrderDetail orderDetail)
        {
            if (id != orderDetail.OrderDetailId)
                return BadRequest();

            return await _orderDetailRepository.Update(orderDetail);
        }

        // POST: api/OrderDetail
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrderDetail>> PostOrderDetail(OrderDetail orderDetail)
        {
            if (orderDetail is null)
                return BadRequest();

            return await _orderDetailRepository.Add(orderDetail);
        }

        // DELETE: api/OrderDetail/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteOrderDetail(int id)
        {
            return await _orderDetailRepository.Delete(id);
        }
    }
}
