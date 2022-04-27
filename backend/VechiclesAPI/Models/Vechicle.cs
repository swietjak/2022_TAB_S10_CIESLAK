using System;
using System.Collections.Generic;

namespace VechiclesAPI.Models
{
    public partial class Vechicle
    {
        public Vechicle()
        {
            CarAbsenses = new HashSet<CarAbsense>();
            Reservations = new HashSet<Reservation>();
            ServiceExecutions = new HashSet<ServiceExecution>();
            VechicleEquipments = new HashSet<VechicleEquipment>();
            VechiclesCares = new HashSet<VechiclesCare>();
        }

        public int Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Vin { get; set; }

        public virtual ICollection<CarAbsense> CarAbsenses { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
        public virtual ICollection<ServiceExecution> ServiceExecutions { get; set; }
        public virtual ICollection<VechicleEquipment> VechicleEquipments { get; set; }
        public virtual ICollection<VechiclesCare> VechiclesCares { get; set; }
    }
}
