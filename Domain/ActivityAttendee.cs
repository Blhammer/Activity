using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class ActivityAttendee
    {
        [Key]
        public Guid ActivityId { get; set; }

        [Required]
        public string AppUserId { get; set; } = null!;

        [Required]
        public AppUser AppUser { get; set; } = null!;

        [Required]
        public Activity Activity { get; set; } = null!;

        [Required]
        public bool IsHost { get; set; }
    }
}
