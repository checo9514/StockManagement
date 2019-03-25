using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Stock_management.Models.Repository;

namespace Stock_management.Models.DataManager
{
    public class ProductManager : StockDataRepository<Products>
    {
        private readonly StockContext _context;
        
        public ProductManager(StockContext context)
        {
            _context = context;
        }

        public IEnumerable<Products> GetAll()
        {
            return _context.Products.ToList();
            //throw new NotImplementedException();
        }

        public Products Get(Guid id)
        {
            return _context.Products
                  .FirstOrDefault(e => e.Id == id);
            //throw new NotImplementedException();
        }

        public void Add(Products entity)
        {
            _context.Products.Add(entity);
            _context.SaveChanges();
            //throw new NotImplementedException();
        }

        public void Update(Products products, Products entity)
        {
            products.Id = entity.Id;
            products.Model = entity.Model;
            products.Description = entity.Description;
            products.Year = entity.Year;
            products.Brand = entity.Brand;
            products.Kilometers = entity.Kilometers;
            products.Price = entity.Price;

            _context.SaveChanges();
            //throw new NotImplementedException();
        }

        public void Delete(Products entity)
        {
            _context.Products.Remove(entity);
            _context.SaveChanges();
            //throw new NotImplementedException();
        }

        public void Save()
        {
            _context.SaveChanges();
            //throw new NotImplementedException();
        }
    }
}
