using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Activity
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Title { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [StringLength(300)]
        public string Description { get; set; }

        [Required]
        public string Category { get; set; }

        [Required]
        [StringLength(30)]
        public string City { get; set; }

        [Required]
        public string Venue { get; set; }
    }
}
