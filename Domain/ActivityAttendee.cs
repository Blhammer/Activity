using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class ActivityAttendee // Entity
    {
        public Guid ActivityId { get; set; }

        public string AppUserId { get; set; }

        public AppUser AppUser { get; set; }

        public Activity Activity { get; set; }

        public bool IsHost { get; set; }
    }
}
