using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace VechiclesAPI.Models
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
        public virtual DbSet<Vechicle> Vechicles { get; set; }
        public virtual DbSet<VechicleEquipment> VechicleEquipments { get; set; }
        public virtual DbSet<VechicleReturn> VechicleReturns { get; set; }
        public virtual DbSet<VechiclesCare> VechiclesCares { get; set; }
        public virtual DbSet<Worker> Workers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            System.Console.WriteLine("Tworze sie ###########################################");
            modelBuilder.Entity<CarAbsense>(entity =>
            {
                entity.ToTable("car_absenses");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.EndDate).HasColumnName("end_date");

                entity.Property(e => e.StartDate).HasColumnName("start_date");

                entity.Property(e => e.VechicleId).HasColumnName("vechicle_id");

                entity.HasOne(d => d.Vechicle)
                    .WithMany(p => p.CarAbsenses)
                    .HasForeignKey(d => d.VechicleId)
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

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Date).HasColumnName("date");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.MeterIndication).HasColumnName("meter_indication");

                entity.Property(e => e.ReservationId).HasColumnName("reservation_id");

                entity.Property(e => e.VechicleReturnId).HasColumnName("vechicle_return_id");

                entity.HasOne(d => d.VechicleReturn)
                    .WithMany(p => p.Rentals)
                    .HasForeignKey(d => d.VechicleReturnId)
                    .HasConstraintName("rentals_vechicle_return_id_fkey");
            });

            modelBuilder.Entity<Reservation>(entity =>
            {
                entity.ToTable("reservations");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.DateFrom).HasColumnName("date_from");

                entity.Property(e => e.DateTo).HasColumnName("date_to");

                entity.Property(e => e.RentalId).HasColumnName("rental_id");

                entity.Property(e => e.VechicleId).HasColumnName("vechicle_id");

                entity.Property(e => e.WorkerId).HasColumnName("worker_id");

                entity.HasOne(d => d.Rental)
                    .WithMany(p => p.Reservations)
                    .HasForeignKey(d => d.RentalId)
                    .HasConstraintName("reservations_rental_id_fkey");

                entity.HasOne(d => d.Vechicle)
                    .WithMany(p => p.Reservations)
                    .HasForeignKey(d => d.VechicleId)
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

                entity.Property(e => e.ServiceId).HasColumnName("service_id");

                entity.Property(e => e.StartDate).HasColumnName("start_date");

                entity.Property(e => e.VechicleCareId).HasColumnName("vechicle_care_id");

                entity.Property(e => e.VechicleId).HasColumnName("vechicle_id");

                entity.HasOne(d => d.OfferedService)
                    .WithMany(p => p.ServiceExecutions)
                    .HasForeignKey(d => d.OfferedServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("service_executions_offered_service_id_fkey");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.ServiceExecutions)
                    .HasForeignKey(d => d.ServiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("service_executions_service_id_fkey");

                entity.HasOne(d => d.Vechicle)
                    .WithMany(p => p.ServiceExecutions)
                    .HasForeignKey(d => d.VechicleId)
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

            modelBuilder.Entity<Vechicle>(entity =>
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
            });

            modelBuilder.Entity<VechicleEquipment>(entity =>
            {
                entity.HasKey(e => new { e.VechicleId, e.EquipmentId })
                    .HasName("vechicle_equipment_pkey");

                entity.ToTable("vechicle_equipment");

                entity.Property(e => e.VechicleId).HasColumnName("vechicle_id");

                entity.Property(e => e.EquipmentId).HasColumnName("equipment_id");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.HasOne(d => d.Equipment)
                    .WithMany(p => p.VechicleEquipments)
                    .HasForeignKey(d => d.EquipmentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("vechicle_equipment_equipment_id_fkey");

                entity.HasOne(d => d.Vechicle)
                    .WithMany(p => p.VechicleEquipments)
                    .HasForeignKey(d => d.VechicleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("vechicle_equipment_vechicle_id_fkey");
            });

            modelBuilder.Entity<VechicleReturn>(entity =>
            {
                entity.ToTable("vechicle_returns");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Date).HasColumnName("date");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.FuelConsumption).HasColumnName("fuel_consumption");

                entity.Property(e => e.MeterIndication).HasColumnName("meter_indication");

                entity.Property(e => e.ReservationId).HasColumnName("reservation_id");

                entity.HasOne(d => d.Reservation)
                    .WithMany(p => p.VechicleReturns)
                    .HasForeignKey(d => d.ReservationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("vechicle_returns_reservation_id_fkey");
            });

            modelBuilder.Entity<VechiclesCare>(entity =>
            {
                entity.ToTable("vechicles_cares");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.EndDate).HasColumnName("end_date");

                entity.Property(e => e.StartDate).HasColumnName("start_date");

                entity.Property(e => e.VechicleId).HasColumnName("vechicle_id");

                entity.Property(e => e.WorkerId).HasColumnName("worker_id");

                entity.HasOne(d => d.Vechicle)
                    .WithMany(p => p.VechiclesCares)
                    .HasForeignKey(d => d.VechicleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("vechicles_cares_vechicle_id_fkey");

                entity.HasOne(d => d.Worker)
                    .WithMany(p => p.VechiclesCares)
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

                entity.Property(e => e.Pesel)
                    .IsRequired()
                    .HasMaxLength(11)
                    .HasColumnName("pesel");

                entity.Property(e => e.Surname)
                    .IsRequired()
                    .HasColumnName("surname");
            });

            OnModelCreatingPartial(modelBuilder);
            SeedDataBase(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

        private void SeedDataBase(ModelBuilder modelBuilder){

        #region WorkerSeed
        modelBuilder.Entity<Worker>().HasData(
            new Worker { Id = 1, FirstName = "Subaru", Surname = "Impreza", Pesel = "00000000000", Hascarepermissions = false, Isadmin = false},
            new Worker { Id = 2, FirstName = "Subaru", Surname = "Impreza", Pesel = "00000000000", Hascarepermissions = false, Isadmin = false}, 
            new Worker { Id = 3, FirstName = "Subaru", Surname = "Impreza", Pesel = "00000000000", Hascarepermissions = false, Isadmin = false},
            new Worker { Id = 4, FirstName = "Subaru", Surname = "Impreza", Pesel = "00000000000", Hascarepermissions = false, Isadmin = false},
            new Worker { Id = 5, FirstName = "Subaru", Surname = "Impreza", Pesel = "00000000000", Hascarepermissions = false, Isadmin = false}, 
            new Worker { Id = 6, FirstName = "Subaru", Surname = "Impreza", Pesel = "00000000000", Hascarepermissions = false, Isadmin = false},
            new Worker { Id = 7, FirstName = "Subaru", Surname = "Impreza", Pesel = "00000000000", Hascarepermissions = false, Isadmin = false},
            new Worker { Id = 8, FirstName = "Subaru", Surname = "Impreza", Pesel = "00000000000", Hascarepermissions = false, Isadmin = false}, 
            new Worker { Id = 9, FirstName = "Subaru", Surname = "Impreza", Pesel = "00000000000", Hascarepermissions = false, Isadmin = false},
            new Worker { Id = 10, FirstName = "Subaru", Surname = "Impreza", Pesel = "00000000000", Hascarepermissions = false, Isadmin = false},
            new Worker { Id = 11, FirstName = "Subaru", Surname = "Impreza", Pesel = "00000000000", Hascarepermissions = false, Isadmin = false}, 
            new Worker { Id = 12, FirstName = "Subaru", Surname = "Impreza", Pesel = "00000000000", Hascarepermissions = false, Isadmin = false});
        #endregion

        #region ServiceSeed
        modelBuilder.Entity<Service>().HasData(
            new Service { Id = 1, Name = "Subaru"},
            new Service { Id = 2, Name = "Subaru"}, 
            new Service { Id = 3, Name = "Subaru"},
            new Service { Id = 4, Name = "Subaru"},
            new Service { Id = 5, Name = "Subaru"}, 
            new Service { Id = 6, Name = "Subaru"},
            new Service { Id = 7, Name = "Subaru"},
            new Service { Id = 8, Name = "Subaru"}, 
            new Service { Id = 9, Name = "Subaru"},
            new Service { Id = 10, Name = "Subaru"},
            new Service { Id = 11, Name = "Subaru"}, 
            new Service { Id = 12, Name = "Subaru"});
        #endregion

        #region ExternalServicerSeed
        modelBuilder.Entity<ExternalServicer>().HasData(
            new ExternalServicer { Id = 1, Name = "Subaru"},
            new ExternalServicer { Id = 2, Name = "Subaru"}, 
            new ExternalServicer { Id = 3, Name = "Subaru"},
            new ExternalServicer { Id = 4, Name = "Subaru"},
            new ExternalServicer { Id = 5, Name = "Subaru"}, 
            new ExternalServicer { Id = 6, Name = "Subaru"},
            new ExternalServicer { Id = 7, Name = "Subaru"},
            new ExternalServicer { Id = 8, Name = "Subaru"}, 
            new ExternalServicer { Id = 9, Name = "Subaru"},
            new ExternalServicer { Id = 10, Name = "Subaru"},
            new ExternalServicer { Id = 11, Name = "Subaru"}, 
            new ExternalServicer { Id = 12, Name = "Subaru"});
        #endregion

        #region OfferredServicesSeed
        modelBuilder.Entity<OfferedService>().HasData(
            new OfferedService { Id = 1, ServiceId = 1, ExternalServicerId = 1},
            new OfferedService { Id = 2, ServiceId = 1, ExternalServicerId = 1}, 
            new OfferedService { Id = 3, ServiceId = 1, ExternalServicerId = 1},
            new OfferedService { Id = 4, ServiceId = 1, ExternalServicerId = 1},
            new OfferedService { Id = 5, ServiceId = 1, ExternalServicerId = 1}, 
            new OfferedService { Id = 6, ServiceId = 1, ExternalServicerId = 1},
            new OfferedService { Id = 7, ServiceId = 1, ExternalServicerId = 1},
            new OfferedService { Id = 8, ServiceId = 1, ExternalServicerId = 1}, 
            new OfferedService { Id = 9, ServiceId = 1, ExternalServicerId = 1},
            new OfferedService { Id = 10, ServiceId = 1, ExternalServicerId = 1},
            new OfferedService { Id = 11, ServiceId = 1, ExternalServicerId = 1}, 
            new OfferedService { Id = 12, ServiceId = 1, ExternalServicerId = 1});
        #endregion

        #region ServicePricingSeed
        modelBuilder.Entity<ServicePricing>().HasData(
            new ServicePricing { Id = 1, OfferedServiceId = 1, Price = 0.00, StartDate = new DateOnly(1970,1,1),EndDate = new DateOnly(1970,1,1)},
            new ServicePricing { Id = 2, OfferedServiceId = 1, Price = 0.00, StartDate = new DateOnly(1970,1,1),EndDate = new DateOnly(1970,1,1)}, 
            new ServicePricing { Id = 3, OfferedServiceId = 1, Price = 0.00, StartDate = new DateOnly(1970,1,1),EndDate = new DateOnly(1970,1,1)},
            new ServicePricing { Id = 4, OfferedServiceId = 1, Price = 0.00, StartDate = new DateOnly(1970,1,1),EndDate = new DateOnly(1970,1,1)},
            new ServicePricing { Id = 5, OfferedServiceId = 1, Price = 0.00, StartDate = new DateOnly(1970,1,1),EndDate = new DateOnly(1970,1,1)}, 
            new ServicePricing { Id = 6, OfferedServiceId = 1, Price = 0.00, StartDate = new DateOnly(1970,1,1),EndDate = new DateOnly(1970,1,1)},
            new ServicePricing { Id = 7, OfferedServiceId = 1, Price = 0.00, StartDate = new DateOnly(1970,1,1),EndDate = new DateOnly(1970,1,1)},
            new ServicePricing { Id = 8, OfferedServiceId = 1, Price = 0.00, StartDate = new DateOnly(1970,1,1),EndDate = new DateOnly(1970,1,1)}, 
            new ServicePricing { Id = 9, OfferedServiceId = 1, Price = 0.00, StartDate = new DateOnly(1970,1,1),EndDate = new DateOnly(1970,1,1)},
            new ServicePricing { Id = 10, OfferedServiceId = 1, Price = 0.00, StartDate = new DateOnly(1970,1,1),EndDate = new DateOnly(1970,1,1)},
            new ServicePricing { Id = 11, OfferedServiceId = 1, Price = 0.00, StartDate = new DateOnly(1970,1,1),EndDate = new DateOnly(1970,1,1)}, 
            new ServicePricing { Id = 12, OfferedServiceId = 1, Price = 0.00, StartDate = new DateOnly(1970,1,1),EndDate = new DateOnly(1970,1,1)});
        #endregion

        #region EquipmentSeed
        modelBuilder.Entity<Equipment>().HasData(
            new Equipment { Id = 1, Name = "Subaru", Description = "Impreza"},
            new Equipment { Id = 2, Name = "Subaru", Description = "Impreza"}, 
            new Equipment { Id = 3, Name = "Subaru", Description = "Impreza"},
            new Equipment { Id = 4, Name = "Subaru", Description = "Impreza"},
            new Equipment { Id = 5, Name = "Subaru", Description = "Impreza"}, 
            new Equipment { Id = 6, Name = "Subaru", Description = "Impreza"},
            new Equipment { Id = 7, Name = "Subaru", Description = "Impreza"},
            new Equipment { Id = 8, Name = "Subaru", Description = "Impreza"}, 
            new Equipment { Id = 9, Name = "Subaru", Description = "Impreza"},
            new Equipment { Id = 10, Name = "Subaru", Description = "Impreza"},
            new Equipment { Id = 11, Name = "Subaru", Description = "Impreza"}, 
            new Equipment { Id = 12, Name = "Subaru", Description = "Impreza"});
        #endregion       

        


        #region VechicleSeed
        modelBuilder.Entity<Vechicle>().HasData(
            new Vechicle { Id = 1, Brand = "Subaru", Model = "Impreza", Vin = "JF1GD70625L518106"},
            new Vechicle { Id = 2, Brand = "Subaru", Model = "Impreza", Vin = "JF1GD70625L518106"},
            new Vechicle { Id = 3, Brand = "Subaru", Model = "Impreza", Vin = "JF1GD70625L518106"},
            new Vechicle { Id = 4, Brand = "Subaru", Model = "Impreza", Vin = "JF1GD70625L518106"},
            new Vechicle { Id = 5, Brand = "Subaru", Model = "Impreza", Vin = "JF1GD70625L518106"},
            new Vechicle { Id = 6, Brand = "Subaru", Model = "Impreza", Vin = "JF1GD70625L518106"},
            new Vechicle { Id = 7, Brand = "Subaru", Model = "Impreza", Vin = "JF1GD70625L518106"},
            new Vechicle { Id = 8, Brand = "Subaru", Model = "Impreza", Vin = "JF1GD70625L518106"},
            new Vechicle { Id = 9, Brand = "Subaru", Model = "Impreza", Vin = "JF1GD70625L518106"},
            new Vechicle { Id = 10, Brand = "Subaru", Model = "Impreza", Vin = "JF1GD70625L518106"},
            new Vechicle { Id = 11, Brand = "Subaru", Model = "Impreza", Vin = "JF1GD70625L518106"},
            new Vechicle { Id = 12, Brand = "Subaru", Model = "Impreza", Vin = "JF1GD70625L518106"});
        #endregion

        #region VechicleEquipmentSeed
        modelBuilder.Entity<VechicleEquipment>().HasData(
            new VechicleEquipment { VechicleId = 1, EquipmentId = 1, Amount = 1},
            new VechicleEquipment { VechicleId = 1, EquipmentId = 2, Amount = 1},
            new VechicleEquipment { VechicleId = 1, EquipmentId = 3, Amount = 1},
            new VechicleEquipment { VechicleId = 1, EquipmentId = 4, Amount = 1},
            new VechicleEquipment { VechicleId = 1, EquipmentId = 5, Amount = 1},
            new VechicleEquipment { VechicleId = 1, EquipmentId = 6, Amount = 1},
            new VechicleEquipment { VechicleId = 1, EquipmentId = 7, Amount = 1},
            new VechicleEquipment { VechicleId = 1, EquipmentId = 8, Amount = 1},
            new VechicleEquipment { VechicleId = 1, EquipmentId = 9, Amount = 1},
            new VechicleEquipment { VechicleId = 1, EquipmentId = 10, Amount = 1},
            new VechicleEquipment { VechicleId = 1, EquipmentId = 11, Amount = 1},
            new VechicleEquipment { VechicleId = 1, EquipmentId = 12, Amount = 1});
        #endregion

        #region VechicleCareSeed
        modelBuilder.Entity<VechiclesCare>().HasData(
            new VechiclesCare { Id = 1, VechicleId =1, WorkerId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1) },
            new VechiclesCare { Id = 2, VechicleId =1, WorkerId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1) },
            new VechiclesCare { Id = 3, VechicleId =1, WorkerId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1) },
            new VechiclesCare { Id = 4, VechicleId =1, WorkerId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1) },
            new VechiclesCare { Id = 5, VechicleId =1, WorkerId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1) },
            new VechiclesCare { Id = 6, VechicleId =1, WorkerId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1) },
            new VechiclesCare { Id = 7, VechicleId =1, WorkerId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1) },
            new VechiclesCare { Id = 8, VechicleId =1, WorkerId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1) },
            new VechiclesCare { Id = 9, VechicleId =1, WorkerId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1) },
            new VechiclesCare { Id = 10, VechicleId =1, WorkerId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1) },
            new VechiclesCare { Id = 11, VechicleId =1, WorkerId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1) },
            new VechiclesCare { Id = 12, VechicleId =1, WorkerId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1) });
        #endregion

        #region ServiceExecutionSeed
        modelBuilder.Entity<ServiceExecution>().HasData(
            new ServiceExecution { Id = 1, VechicleId =1, ServiceId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1), Description = "", IsFinished = false, VechicleCareId = 1, OfferedServiceId = 1 },
            new ServiceExecution { Id = 2, VechicleId =1, ServiceId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1), Description = "", IsFinished = false, VechicleCareId = 1, OfferedServiceId = 1 },
            new ServiceExecution { Id = 3, VechicleId =1, ServiceId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1), Description = "", IsFinished = false, VechicleCareId = 1, OfferedServiceId = 1 },
            new ServiceExecution { Id = 4, VechicleId =1, ServiceId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1), Description = "", IsFinished = false, VechicleCareId = 1, OfferedServiceId = 1 },
            new ServiceExecution { Id = 5, VechicleId =1, ServiceId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1), Description = "", IsFinished = false, VechicleCareId = 1, OfferedServiceId = 1 },
            new ServiceExecution { Id = 6, VechicleId =1, ServiceId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1), Description = "", IsFinished = false, VechicleCareId = 1, OfferedServiceId = 1 },
            new ServiceExecution { Id = 7, VechicleId =1, ServiceId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1), Description = "", IsFinished = false, VechicleCareId = 1, OfferedServiceId = 1 },
            new ServiceExecution { Id = 8, VechicleId =1, ServiceId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1), Description = "", IsFinished = false, VechicleCareId = 1, OfferedServiceId = 1 },
            new ServiceExecution { Id = 9, VechicleId =1, ServiceId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1), Description = "", IsFinished = false, VechicleCareId = 1, OfferedServiceId = 1 },
            new ServiceExecution { Id = 10, VechicleId =1, ServiceId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1), Description = "", IsFinished = false, VechicleCareId = 1, OfferedServiceId = 1 },
            new ServiceExecution { Id = 11, VechicleId =1, ServiceId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1), Description = "", IsFinished = false, VechicleCareId = 1, OfferedServiceId = 1 },
            new ServiceExecution { Id = 12, VechicleId =1, ServiceId = 1, StartDate = new DateOnly(1970,1,1), EndDate = new DateOnly(1970,1,1), Description = "", IsFinished = false, VechicleCareId = 1, OfferedServiceId = 1 });
        #endregion
/*
        #region ReservationSeed
         modelBuilder.Entity<Reservation>().HasData(
            new Reservation { Id = 1, VechicleId =1, DateFrom = new DateOnly(1970,1,1), DateTo = new DateOnly(1970,1,1), WorkerId =1},
            new Reservation { Id = 2, VechicleId =1, DateFrom = new DateOnly(1970,1,1), DateTo = new DateOnly(1970,1,1), WorkerId =1},
            new Reservation { Id = 3, VechicleId =1, DateFrom = new DateOnly(1970,1,1), DateTo = new DateOnly(1970,1,1), WorkerId =1},
            new Reservation { Id = 4, VechicleId =1, DateFrom = new DateOnly(1970,1,1), DateTo = new DateOnly(1970,1,1), WorkerId =1},
            new Reservation { Id = 5, VechicleId =1, DateFrom = new DateOnly(1970,1,1), DateTo = new DateOnly(1970,1,1), WorkerId =1},
            new Reservation { Id = 6, VechicleId =1, DateFrom = new DateOnly(1970,1,1), DateTo = new DateOnly(1970,1,1), WorkerId =1},
            new Reservation { Id = 7, VechicleId =1, DateFrom = new DateOnly(1970,1,1), DateTo = new DateOnly(1970,1,1), WorkerId =1},
            new Reservation { Id = 8, VechicleId =1, DateFrom = new DateOnly(1970,1,1), DateTo = new DateOnly(1970,1,1), WorkerId =1},
            new Reservation { Id = 9, VechicleId =1, DateFrom = new DateOnly(1970,1,1), DateTo = new DateOnly(1970,1,1), WorkerId =1},
            new Reservation { Id = 10, VechicleId =1, DateFrom = new DateOnly(1970,1,1), DateTo = new DateOnly(1970,1,1), WorkerId =1},
            new Reservation { Id = 11, VechicleId =1, DateFrom = new DateOnly(1970,1,1), DateTo = new DateOnly(1970,1,1), WorkerId =1},
            new Reservation { Id = 12, VechicleId =1, DateFrom = new DateOnly(1970,1,1), DateTo = new DateOnly(1970,1,1), WorkerId =1});
        #endregion
*/
/*
        #region RentalSeed
        modelBuilder.Entity<Rental>().HasData(
            new Rental { Id = 1, Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0},
            new Rental { Id = 2, Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0},
            new Rental { Id = 3, Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0},
            new Rental { Id = 4, Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0},
            new Rental { Id = 5, Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0},
            new Rental { Id = 6, Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0},
            new Rental { Id = 7, Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0},
            new Rental { Id = 8, Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0},
            new Rental { Id = 9, Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0},
            new Rental { Id = 10, Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0},
            new Rental { Id = 11, Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0},
            new Rental { Id = 12, Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0});
        #endregion        
*/
        #region CarAbsenseSeed
        modelBuilder.Entity<CarAbsense>().HasData(
            new CarAbsense { Id = 1, StartDate = new DateOnly(1970,1,1),EndDate=new DateOnly(1970,1,1), Description = "", VechicleId = 1},
            new CarAbsense { Id = 2, StartDate = new DateOnly(1970,1,1),EndDate=new DateOnly(1970,1,1), Description = "", VechicleId = 1},
            new CarAbsense { Id = 3, StartDate = new DateOnly(1970,1,1),EndDate=new DateOnly(1970,1,1), Description = "", VechicleId = 1},
            new CarAbsense { Id = 4, StartDate = new DateOnly(1970,1,1),EndDate=new DateOnly(1970,1,1), Description = "", VechicleId = 1},
            new CarAbsense { Id = 5, StartDate = new DateOnly(1970,1,1),EndDate=new DateOnly(1970,1,1), Description = "", VechicleId = 1},
            new CarAbsense { Id = 6, StartDate = new DateOnly(1970,1,1),EndDate=new DateOnly(1970,1,1), Description = "", VechicleId = 1},
            new CarAbsense { Id = 7, StartDate = new DateOnly(1970,1,1),EndDate=new DateOnly(1970,1,1), Description = "", VechicleId = 1},
            new CarAbsense { Id = 8, StartDate = new DateOnly(1970,1,1),EndDate=new DateOnly(1970,1,1), Description = "", VechicleId = 1},
            new CarAbsense { Id = 9, StartDate = new DateOnly(1970,1,1),EndDate=new DateOnly(1970,1,1), Description = "", VechicleId = 1},
            new CarAbsense { Id = 10,  StartDate = new DateOnly(1970,1,1),EndDate=new DateOnly(1970,1,1), Description = "", VechicleId = 1},
            new CarAbsense { Id = 11,  StartDate = new DateOnly(1970,1,1),EndDate=new DateOnly(1970,1,1), Description = "", VechicleId = 1},
            new CarAbsense { Id = 12,  StartDate = new DateOnly(1970,1,1),EndDate=new DateOnly(1970,1,1), Description = "", VechicleId = 1});
        #endregion
/*
        #region VechicleReturnSeed
        modelBuilder.Entity<VechicleReturn>().HasData(
            new VechicleReturn { Id = 1, Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0, FuelConsumption = 1},
            new VechicleReturn { Id = 2, Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0, FuelConsumption = 1},
            new VechicleReturn { Id = 3, Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0, FuelConsumption = 1},
            new VechicleReturn { Id = 4, Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0, FuelConsumption = 1},
            new VechicleReturn { Id = 5, Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0, FuelConsumption = 1},
            new VechicleReturn { Id = 6, Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0, FuelConsumption = 1},
            new VechicleReturn { Id = 7, Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0, FuelConsumption = 1},
            new VechicleReturn { Id = 8, Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0, FuelConsumption = 1},
            new VechicleReturn { Id = 9, Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0, FuelConsumption = 1},
            new VechicleReturn { Id = 10,  Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0, FuelConsumption = 1},
            new VechicleReturn { Id = 11,  Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0, FuelConsumption = 1},
            new VechicleReturn { Id = 12,  Date = new DateOnly(1970,1,1), Description = "", ReservationId = 1, MeterIndication = 0, FuelConsumption = 1});
        #endregion
*/
        

    }
    }
   
}
