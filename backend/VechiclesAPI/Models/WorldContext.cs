using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace VehiclesAPI.Models
{
    public partial class WorldContext : DbContext
    {
        public WorldContext(DbContextOptions<WorldContext> options)
             : base(options)
        {
        }

        public virtual DbSet<CarAbsense> CarAbsenses { get; set; }
        public virtual DbSet<Equipment> Equipments { get; set; }
        public virtual DbSet<ExternalServicer> ExternalServicers { get; set; }
        public virtual DbSet<OfferedService> OfferedServices { get; set; }
        public virtual DbSet<Rental> Rentals { get; set; }
        public virtual DbSet<Reservation> Reservations { get; set; }
        public virtual DbSet<Service> Services { get; set; }
        public virtual DbSet<ServiceExecution> ServiceExecutions { get; set; }
        public virtual DbSet<ServicePricing> ServicePricings { get; set; }
        public virtual DbSet<Vehicle> Vehicles { get; set; }
        public virtual DbSet<VehicleEquipment> VehicleEquipments { get; set; }
        public virtual DbSet<VehicleReturn> VehicleReturns { get; set; }
        public virtual DbSet<VehiclesCare> VehiclesCares { get; set; }
        public virtual DbSet<Worker> Workers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CarAbsense>(entity =>
            {
                entity.ToTable("car_absenses");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.EndDate).HasColumnName("end_date");

                entity.Property(e => e.StartDate).HasColumnName("start_date");

                entity.Property(e => e.VehicleId).HasColumnName("vechicle_id");

                entity.HasOne(d => d.Vehicle)
                    .WithMany(p => p.CarAbsenses)
                    .HasForeignKey(d => d.VehicleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("car_absenses_vechicle_id_fkey");
            });

            modelBuilder.Entity<Equipment>(entity =>
            {
                entity.ToTable("equipments");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("description");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name");
            });

            modelBuilder.Entity<ExternalServicer>(entity =>
            {
                entity.ToTable("external_servicers");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name");
            });

            modelBuilder.Entity<OfferedService>(entity =>
            {
                entity.ToTable("offered_services");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.ExternalServicerId).HasColumnName("external_servicer_id");

                entity.Property(e => e.ServiceId).HasColumnName("service_id");

                entity.HasOne(d => d.ExternalServicer)
                    .WithMany(p => p.OfferedServices)
                    .HasForeignKey(d => d.ExternalServicerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("offered_services_external_servicer_id_fkey");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.OfferedServices)
                    .HasForeignKey(d => d.ServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("offered_services_service_id_fkey");
            });

            modelBuilder.Entity<Rental>(entity =>
            {
                entity.ToTable("rentals");

                entity.HasIndex(e => e.ReservationId, "rentals_reservation_id_key")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Date).HasColumnName("date");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.MeterIndication).HasColumnName("meter_indication");

                entity.Property(e => e.ReservationId).HasColumnName("reservation_id");

                entity.Property(e => e.VehicleReturnId).HasColumnName("vechicle_return_id");

                entity.HasOne(d => d.Reservation)
                    .WithOne(p => p.Rental)
                    .HasForeignKey<Rental>(d => d.ReservationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("rentals_reservation_id_fkey");
            });

            modelBuilder.Entity<Reservation>(entity =>
            {
                entity.ToTable("reservations");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.DateFrom).HasColumnName("date_from");

                entity.Property(e => e.DateTo).HasColumnName("date_to");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.VehicleId).HasColumnName("vechicle_id");

                entity.Property(e => e.WorkerId).HasColumnName("worker_id");

                entity.HasOne(d => d.Vehicle)
                    .WithMany(p => p.Reservations)
                    .HasForeignKey(d => d.VehicleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("reservations_vechicle_id_fkey");

                entity.HasOne(d => d.Worker)
                    .WithMany(p => p.Reservations)
                    .HasForeignKey(d => d.WorkerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("reservations_worker_id_fkey");
            });

            modelBuilder.Entity<Service>(entity =>
            {
                entity.ToTable("services");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name");
            });

            modelBuilder.Entity<ServiceExecution>(entity =>
            {
                entity.ToTable("service_executions");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.EndDate).HasColumnName("end_date");

                entity.Property(e => e.IsFinished).HasColumnName("is_finished");

                entity.Property(e => e.OfferedServiceId).HasColumnName("offered_service_id");

                entity.Property(e => e.StartDate).HasColumnName("start_date");

                entity.Property(e => e.VehicleCareId).HasColumnName("vechicle_care_id");

                entity.Property(e => e.VehicleId).HasColumnName("vechicle_id");

                entity.HasOne(d => d.OfferedService)
                    .WithMany(p => p.ServiceExecutions)
                    .HasForeignKey(d => d.OfferedServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("service_executions_offered_service_id_fkey");

                entity.HasOne(d => d.Vehicle)
                    .WithMany(p => p.ServiceExecutions)
                    .HasForeignKey(d => d.VehicleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("service_executions_vechicle_id_fkey");
            });

            modelBuilder.Entity<ServicePricing>(entity =>
            {
                entity.ToTable("service_pricing");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.EndDate).HasColumnName("end_date");

                entity.Property(e => e.OfferedServiceId).HasColumnName("offered_service_id");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.StartDate).HasColumnName("start_date");

                entity.HasOne(d => d.OfferedService)
                    .WithMany(p => p.ServicePricings)
                    .HasForeignKey(d => d.OfferedServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("service_pricing_offered_service_id_fkey");
            });

            modelBuilder.Entity<Vehicle>(entity =>
            {
                entity.ToTable("vechicles");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Brand)
                    .IsRequired()
                    .HasColumnName("brand");

                entity.Property(e => e.Model)
                    .IsRequired()
                    .HasColumnName("model");

                entity.Property(e => e.Vin)
                    .IsRequired()
                    .HasColumnName("vin");

                entity.Property(e => e.EngineCapacity)
                    .IsRequired()
                    .HasColumnName("engine_capacity");

                entity.Property(e => e.EnginePower)
                    .IsRequired()
                    .HasColumnName("engine_power");
            });

            modelBuilder.Entity<VehicleEquipment>(entity =>
            {
                entity.HasKey(e => new { e.VehicleId, e.EquipmentId })
                    .HasName("vechicle_equipment_pkey");

                entity.ToTable("vechicle_equipment");

                entity.Property(e => e.VehicleId).HasColumnName("vechicle_id");

                entity.Property(e => e.EquipmentId).HasColumnName("equipment_id");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.HasOne(d => d.Equipment)
                    .WithMany(p => p.VehicleEquipments)
                    .HasForeignKey(d => d.EquipmentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("vechicle_equipment_equipment_id_fkey");

                entity.HasOne(d => d.Vehicle)
                    .WithMany(p => p.VehicleEquipments)
                    .HasForeignKey(d => d.VehicleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("vechicle_equipment_vechicle_id_fkey");
            });

            modelBuilder.Entity<VehicleReturn>(entity =>
            {
                entity.ToTable("vechicle_returns");

                entity.HasIndex(e => e.RentalId, "vechicle_returns_rental_id_key")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Date).HasColumnName("date");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.FuelConsumption).HasColumnName("fuel_consumption");

                entity.Property(e => e.MeterIndication).HasColumnName("meter_indication");

                entity.Property(e => e.RentalId).HasColumnName("rental_id");

                entity.HasOne(d => d.Rental)
                    .WithOne(p => p.VehicleReturn)
                    .HasForeignKey<VehicleReturn>(d => d.RentalId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("vechicle_returns_rental_id_fkey");
            });

            modelBuilder.Entity<VehiclesCare>(entity =>
            {
                entity.ToTable("vechicles_cares");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.EndDate).HasColumnName("end_date");

                entity.Property(e => e.StartDate).HasColumnName("start_date");

                entity.Property(e => e.VehicleId).HasColumnName("vechicle_id");

                entity.Property(e => e.WorkerId).HasColumnName("worker_id");

                entity.HasOne(d => d.Vehicle)
                    .WithMany(p => p.VehiclesCares)
                    .HasForeignKey(d => d.VehicleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("vechicles_cares_vechicle_id_fkey");

                entity.HasOne(d => d.Worker)
                    .WithMany(p => p.VehiclesCares)
                    .HasForeignKey(d => d.WorkerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("vechicles_cares_worker_id_fkey");
            });

            modelBuilder.Entity<Worker>(entity =>
            {
                entity.ToTable("workers");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("first_name");

                entity.Property(e => e.Hascarepermissions).HasColumnName("hascarepermissions");

                entity.Property(e => e.Isadmin).HasColumnName("isadmin");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password");

                entity.Property(e => e.Pesel)
                    .IsRequired()
                    .HasMaxLength(11)
                    .HasColumnName("pesel");

                entity.Property(e => e.Surname)
                    .IsRequired()
                    .HasColumnName("surname");

                entity.Property(e => e.Email).HasColumnName("email");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
