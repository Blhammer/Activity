using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        [Required]
        [StringLength(50)]
        public string DisplayName { get; set; } = null!;

        [Required]
        [StringLength(50)]
        public string Bio { get; set; } = null!;

        public ICollection<ActivityAttendee> Activities { get; set; }
    }
}
