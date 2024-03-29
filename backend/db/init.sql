-- This script was generated by a beta version of the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;

CREATE TABLE IF NOT EXISTS public.vechicles
(
    id serial,
    brand text NOT NULL,
    model text NOT NULL,
    vin text NOT NULL,
    engine_capacity double precision NOT NULL,
    engine_power int NOT NULL,
    is_deleted boolean NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.reservations
(
    id serial,
    date_from timestamptz NOT NULL,
    date_to timestamptz NOT NULL,
    worker_id integer NOT NULL,
    vechicle_id integer NOT NULL,
    description text,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.workers
(
    id serial,
    first_name text NOT NULL,
    surname text NOT NULL,
    pesel character varying(11) NOT NULL,
    password text NOT NULL,
    hasCarePermissions boolean,
    isAdmin boolean,
    email TEXT NOT NULL,
    is_deleted boolean NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.rentals
(
    id serial,
    date timestamptz NOT NULL,
    description text,
    reservation_id integer NOT NULL,
    meter_indication integer NOT NULL,
    UNIQUE(reservation_id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.vechicle_returns
(
    id serial,
    date timestamptz NOT NULL,
    description text,
    meter_indication integer NOT NULL,
    fuel_consumption double precision NOT NULL,
    rental_id integer NOT NULL,
    UNIQUE(rental_id),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.vechicles_cares
(
    id serial,
    vechicle_id integer NOT NULL,
    worker_id integer NOT NULL,
    start_date timestamptz NOT NULL,
    end_date timestamptz,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.equipments
(
    id serial,
    name text NOT NULL,
    description text NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.vechicle_equipment
(
    vechicle_id integer NOT NULL,
    equipment_id integer NOT NULL,
    amount integer,
    PRIMARY KEY (vechicle_id, equipment_id)
);

CREATE TABLE IF NOT EXISTS public.car_absenses
(
    id serial,
    start_date timestamptz NOT NULL,
    end_date timestamptz NOT NULL,
    vechicle_id integer NOT NULL,
    description text,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.services
(
    id serial,
    name text NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.service_executions
(
    id serial,
    start_date timestamptz NOT NULL,
    end_date timestamptz NOT NULL,
    description text,
    is_finished boolean NOT NULL,
    vechicle_care_id integer NOT NULL,
    service_pricing_id integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.external_servicers
(
    id serial,
    name text NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.offered_services
(
    id serial,
    service_id integer NOT NULL,
    external_servicer_id integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.service_pricing
(
    id serial,
    offered_service_id integer NOT NULL,
    price double precision NOT NULL,
    start_date timestamptz NOT NULL,
    end_date timestamptz,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.reservations
    ADD FOREIGN KEY (worker_id)
    REFERENCES public.workers (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.reservations
    ADD FOREIGN KEY (vechicle_id)
    REFERENCES public.vechicles (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.rentals
    ADD FOREIGN KEY (reservation_id)
    REFERENCES public.reservations (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.vechicle_returns
    ADD FOREIGN KEY (rental_id)
    REFERENCES public.rentals (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.vechicles_cares
    ADD FOREIGN KEY (vechicle_id)
    REFERENCES public.vechicles (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.vechicles_cares
    ADD FOREIGN KEY (worker_id)
    REFERENCES public.workers (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.vechicle_equipment
    ADD FOREIGN KEY (vechicle_id)
    REFERENCES public.vechicles (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.vechicle_equipment
    ADD FOREIGN KEY (equipment_id)
    REFERENCES public.equipments (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.car_absenses
    ADD FOREIGN KEY (vechicle_id)
    REFERENCES public.vechicles (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

ALTER TABLE IF EXISTS public.service_executions
    ADD FOREIGN KEY (service_pricing_id)
    REFERENCES public.service_pricing (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.service_executions
    ADD FOREIGN KEY (vechicle_care_id)
    REFERENCES public.vechicles_cares (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.offered_services
    ADD FOREIGN KEY (service_id)
    REFERENCES public.services (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.offered_services
    ADD FOREIGN KEY (external_servicer_id)
    REFERENCES public.external_servicers (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.service_pricing
    ADD FOREIGN KEY (offered_service_id)
    REFERENCES public.offered_services (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;

INSERT INTO 
    public.workers (id, first_name, surname, pesel, password, hasCarePermissions, isAdmin, email, is_deleted)
VALUES
    (1, 'Jan', 'Kowalski', '12345678', 'AA', true, true, 'test@example.com', false),
    (2, 'Jan', 'Nowak', '12345678', 'AA', true, false, 'test1@example.com', false),
    (3, 'Jan', 'Bowak', '123456789', 'AA', true, false, 'test2@example.com', false),
    (4, 'Jan', 'Mowak', '123456789', 'AA', false, false, 'test3@example.com', false),
    (5, 'Jan', 'Lowak', '123456789', 'AA', false, false, 'test4@example.com', false),
    (6, 'Jan', 'Dowak', '123456789', 'AA', false, false, 'test5@example.com', false);

INSERT INTO 
    public.services (id, name)
VALUES
    (1, 'czyszczenie'),
    (2, 'lakierowanie'),
    (3, 'naprawa elektroniki');

INSERT INTO 
    public.external_servicers (id, name)
VALUES
    (1, 'Czyszczopol'),
    (2, 'Lakieromex'),
    (3, 'Elektrykopol');

INSERT INTO 
    public.offered_services (service_id, external_servicer_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 3);
    
INSERT INTO 
    public.service_pricing ( offered_service_id, price, start_date, end_date)
VALUES
    (1, 10, '1996-12-02', null),
    (2, 20, '1996-12-02', null),
    (3, 30, '1996-12-02', null);

INSERT INTO 
    public.equipments ( name, description)
VALUES
    ('gasnica', 'gasi'),
    ('kabel holowniczy', 'holuje'),
    ('dzik', 'jest dziki');

INSERT INTO 
    public.vechicles ( brand, model, vin, engine_capacity, engine_power, is_deleted)
VALUES
    ('subaru', 'impreza', 'JF1GD70625L518106', 1.9, 130, false),
    ('bmw', 'e36', 'JF1GD70625L518106', 1.9, 130, false),
    ('audi', 'a6', 'JF1GD70625L518106', 1.9, 130, false),
    ('audi', 'a4', 'JF1GD70625L518106', 1.9, 130, false),
    ('audi', 'a3', 'JF1GD70625L518106', 1.9, 130, false);


INSERT INTO 
    public.vechicle_equipment (vechicle_id, equipment_id, amount)
VALUES
    (1, 1, 2),
    (1, 2, 1),
    (1, 3, 1),
    (2, 3, 1),
    (3, 3, 1),
    (4, 3, 1),
    (5, 3, 1);

INSERT INTO 
    public.vechicles_cares ( vechicle_id, worker_id, start_date, end_date)
VALUES
    (1, 2, '2020-12-02', null),
    (2, 2, '2020-12-02', null),
    (3, 3, '2020-12-02', '2023-12-02'),
    (4, 3, '2020-12-02', '2021-12-02'),
    (5, 3, '2020-12-02', null);

COMMIT;
