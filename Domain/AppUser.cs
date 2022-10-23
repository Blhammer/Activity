using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class AppUser : IdentityUser // Entity
    {
        public string DisplayName { get; set; } = null!;

        public string Bio { get; set; } = null!;

        public ICollection<ActivityAttendee> Activities { get; set; }
    }
}
