using System;
using System.Collections.Generic;

namespace VechiclesAPI.Models
{
    public partial class ExternalServicer
    {
        public ExternalServicer()
        {
            OfferedServices = new HashSet<OfferedService>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<OfferedService> OfferedServices { get; set; }
    }
}
