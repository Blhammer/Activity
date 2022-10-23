using Microsoft.AspNetCore.Identity;

namespace Domain
{
    // Relationship One to Many
    public class AppUser : IdentityUser // Entity
    {
        public string DisplayName { get; set; } = null!;

        public string Bio { get; set; } = null!;

        public ICollection<ActivityAttendee> Activities { get; set; }

        public ICollection<Photo> Photos { get; set; }
    }
}
