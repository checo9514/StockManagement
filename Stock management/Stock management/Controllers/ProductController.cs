﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Stock_management.Models;
using Stock_management.Models.Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Stock_management.Controllers
{
    [Route("api/product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly StockDataRepository<Products> _dataRepository;

        public ProductController(StockDataRepository<Products> dataRepository)
        {
            _dataRepository = dataRepository;
        }

        // GET: api/product
        [HttpGet]
        public IActionResult Get()
        {
            IEnumerable<Products> products = _dataRepository.GetAll();
            return Ok(products);
        }

        // GET api/product/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            Products product = _dataRepository.Get(id);

            if (product == null)
            {
                return NotFound("The product record couldn't be found.");
            }

            return Ok(product);
        }

        // POST api/product
        [HttpPost]
        public IActionResult Post([FromBody] Products product)
        {
            if (product == null)
            {
                return BadRequest("product is null.");
            }

            _dataRepository.Add(product);
            return CreatedAtRoute(
                  "Get",
                  new { Id = product.Id },
                  product);
        }

        // PUT api/product/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Products product)
        {
            if (product == null)
            {
                return BadRequest("Product is null.");
            }

            Products productToUpdate = _dataRepository.Get(id);
            if (productToUpdate == null)
            {
                return NotFound("The Product record couldn't be found.");
            }

            _dataRepository.Update(productToUpdate, product);
            return NoContent();
        }

        // DELETE api/product/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Products product = _dataRepository.Get(id);
            if (product == null)
            {
                return NotFound("The Product record couldn't be found.");
            }

            _dataRepository.Delete(product);
            return NoContent();
        }
    }
}
