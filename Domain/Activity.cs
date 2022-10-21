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
        public string Title { get; set; } = null!;

        [Required]
        public DateTime Date { get; set; }

        [Required]
        [StringLength(200)]
        public string Description { get; set; } = null!;

        [Required]
        public string Category { get; set; } = null!;

        [Required]
        [StringLength(30)]
        public string City { get; set; } = null!;

        [Required]
        public string Venue { get; set; } = null!;

        public ICollection<ActivityAttendee> Attendees { get; set; }
     }
}
