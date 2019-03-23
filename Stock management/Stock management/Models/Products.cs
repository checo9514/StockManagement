using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Stock_management.Models
{
    //[Table("products")]
    public class Products
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Model can't be longer than 50 characters")]
        public string Model { get; set; }

        [StringLength(100, ErrorMessage = "Description can't be longer than 100 characters")]
        public string Description { get; set; }
        public int Year { get; set; }

        [Required]
        [StringLength(50, ErrorMessage = "Model can't be longer than 50 characters")]
        public string Brand { get; set; }

        [Required]
        [Range(0, 1000000, ErrorMessage = "Kilometers must be between 0 and 1,000,000")]
        public int Kilometers { get; set; }

        [Required]
        [Range(1.00, 10000000.00, ErrorMessage = "Price must be between $1.00 and $10,000,000.00")]
        public decimal Price { get; set; }
    }
}
