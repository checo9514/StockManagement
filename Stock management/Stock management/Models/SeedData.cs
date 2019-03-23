using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Stock_management.Models;

namespace Stock_management.Models
{
    public class SeedData
    {
        private readonly StockContext _context;

        public SeedData(StockContext context)
        {
            _context = context;
        }

        public void Seeder()
        {
            AddNewType(new Products { Id = 0, Model = "Standard",
                Description = "Seeder data", Year = 1995, Brand = "Ford",
                Kilometers = 100, Price = 1257889
            });
            _context.SaveChanges();
        }

        // since we run this seeder when the app starts
        // we should avoid adding duplicates, so check first
        // then add
        private void AddNewType(Products postType)
        {
            var existingType = _context.Products.FirstOrDefault(p => p.Id == postType.Id);
            if (existingType == null)
            {
                _context.Products.Add(postType);
            }
        }

    }
}
