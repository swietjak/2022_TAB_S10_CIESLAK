using System;
using System.Collections.Generic;

namespace VehiclesAPI.Models
{
    public partial class Vehicle
    {
        public Vehicle()
        {
            CarAbsenses = new HashSet<CarAbsense>();
            Reservations = new HashSet<Reservation>();
            VehicleEquipments = new HashSet<VehicleEquipment>();
            VehiclesCares = new HashSet<VehiclesCare>();
        }

        public int Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Vin { get; set; }
        public double EngineCapacity { get; set; }
        public double EnginePower { get; set; }
        public bool IsDeleted { get; set; }

        public virtual ICollection<CarAbsense> CarAbsenses { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
        public virtual ICollection<VehicleEquipment> VehicleEquipments { get; set; }
        public virtual ICollection<VehiclesCare> VehiclesCares { get; set; }
    }
}
