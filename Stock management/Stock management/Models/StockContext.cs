using Microsoft.EntityFrameworkCore;

namespace Stock_management.Models
{
    public class StockContext : DbContext
    {
        public StockContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<Products> Products { get; set; }

        /*protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Products>()
                .HasKey(c => c.Id);
        }*/
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Products>().HasData(
              new Products
              {
                  Id = 1,
                  Brand = "Ford",
                  Model = "Figo",
                  Year = 2012,
                  Kilometers = 125,
                  Price = 1258.56m
              },
              new Products
              {
                  Id = 2,
                  Brand = "Ford",
                  Model = "Figo",
                  Year = 2012,
                  Kilometers = 125,
                  Price = 1258.56m
              }
            );
        }
    }
}
