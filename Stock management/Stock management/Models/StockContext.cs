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
    }
}
