﻿using System;
using System.Collections.Generic;

namespace VechiclesAPI.Models
{
    public partial class Reservation
    {
        public int Id { get; set; }
        public DateOnly DateFrom { get; set; }
        public DateOnly DateTo { get; set; }
        public int WorkerId { get; set; }
        public int VechicleId { get; set; }
        public string? Description { get; set; }

        public virtual Vechicle Vechicle { get; set; }
        public virtual Worker Worker { get; set; }
        public virtual Rental Rental { get; set; }
    }
}