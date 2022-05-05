import { SchemaOf, object, string } from "yup";

export enum ReservationFormFields {
  Brand = "brand",
  StartDate = "starDate",
  EndDate = "endDate",
}

export interface ReservationFormValues {
  [ReservationFormFields.Brand]: string;
  [ReservationFormFields.StartDate]: string;
  [ReservationFormFields.EndDate]: string;
}

export const defaultValues: ReservationFormValues = {
  brand: "",
  starDate: "",
  endDate: "",
};

export const validationSchema: SchemaOf<ReservationFormValues> = object()
  .shape({
    brand: string().required("JESTEM WYMAGANY"),
    endDate: string().required("JESTEM WYMAGANY"),
    starDate: string().required("JESTEM WYMAGANY"),
  })
  .required();

export const onSubmit = (values: ReservationFormValues) => console.log(values);
