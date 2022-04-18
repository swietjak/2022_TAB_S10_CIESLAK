-- This script was generated by a beta version of the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.vechicles
(
    id integer,
    brand text NOT NULL,
    model text NOT NULL,
    vin text NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.reservations
(
    id integer NOT NULL,
    date_from date NOT NULL,
    date_to date NOT NULL,
    worker_id integer NOT NULL,
    fuel_consumption integer NOT NULL,
    vechicle_id integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.workers
(
    id integer,
    first_name text NOT NULL,
    surname text NOT NULL,
    pesel character varying(11) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.rentals
(
    id integer NOT NULL,
    date date NOT NULL,
    description text,
    reservation_id integer NOT NULL,
    meter_indication integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.vechicle_returns
(
    id integer NOT NULL,
    date date NOT NULL,
    description text,
    reservation_id integer NOT NULL,
    meter_indication integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.vechicles_cares
(
    id integer NOT NULL,
    vechicle_id integer NOT NULL,
    worker_id integer NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.equipment
(
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.vechicle_equipment
(
    vechicle_id integer NOT NULL,
    equipment_id integer NOT NULL,
    amount integer
);

CREATE TABLE IF NOT EXISTS public.car_absenses
(
    id integer NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    vechicle_id integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.services
(
    id integer NOT NULL,
    name text NOT NULL
);

CREATE TABLE IF NOT EXISTS public.service_executions
(
    id integer NOT NULL,
    service_id integer NOT NULL,
    vechicle_id integer NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    price integer NOT NULL,
    description text,
    is_finished boolean NOT NULL,
    vechicle_care_id integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.external_servicers
(
    id integer NOT NULL,
    name text NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.offered_services
(
    service_id integer NOT NULL,
    external_servicer_id integer NOT NULL
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
    ADD FOREIGN KEY (reservation_id)
    REFERENCES public.reservations (id) MATCH SIMPLE
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
    REFERENCES public.equipment (id) MATCH SIMPLE
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
    ADD FOREIGN KEY (service_id)
    REFERENCES public.services (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.service_executions
    ADD FOREIGN KEY (vechicle_id)
    REFERENCES public.vechicles (id) MATCH SIMPLE
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

END;