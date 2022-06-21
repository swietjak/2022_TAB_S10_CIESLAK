import { yupResolver } from "@hookform/resolvers/yup";
import { paths } from "config";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { FieldValue, Servicer } from "shared/types";
import { array, mixed, number, object, SchemaOf, string } from "yup";
import { actions } from "../../store";

export enum ServicePricingFields {
  Service = "service",
  Price = "price",
}

export interface ServicePricingValues {
  [ServicePricingFields.Service]: FieldValue;
  [ServicePricingFields.Price]: number;
}

export const pricingValidationSchema = object()
  .shape({
    [ServicePricingFields.Service]: mixed<FieldValue>().required("REQUIRED"),
    [ServicePricingFields.Price]: number().required("REQUIRED"),
  })
  .required();

export enum ServicerFormFields {
  Name = "name",
  ServicePricings = "servicePricings",
}

export interface ServicerFormValues {
  [ServicerFormFields.Name]: string;
  [ServicerFormFields.ServicePricings]: ServicePricingValues[];
}

export const defaultValues: ServicerFormValues = {
  [ServicerFormFields.Name]: "",
  [ServicerFormFields.ServicePricings]: [],
};

export const validationSchema: SchemaOf<ServicerFormValues> = object()
  .shape({
    [ServicerFormFields.Name]: string().required("REQUIRED"),
    [ServicerFormFields.ServicePricings]: array().of(pricingValidationSchema),
  })
  .required();

const getDefaultValues = (servicer?: Servicer): ServicerFormValues =>
  servicer
    ? {
        name: servicer.name,
        servicePricings: servicer.servicesSummary.map((summary) => ({
          price: summary.price,
          service: {
            label: summary.name,
            value: summary.id,
          },
        })),
      }
    : defaultValues;

export const useServicersForm = (servicer?: Servicer) => {
  return useForm<ServicerFormValues>({
    defaultValues: getDefaultValues(servicer),
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  });
};

export const useOnSubmit = (servicer?: Servicer) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    navigate(paths.servicersTable);
  }, [navigate]);

  return useCallback(
    (values: ServicerFormValues) => {
      const { name, servicePricings } = values;
      const pricings = servicePricings.map(({ price, service }, i) => ({
        price,
        serviceId: service.value,
      }));
      console.log(servicer);
      if (servicer)
        return dispatch(
          actions.updateServicer({
            onSuccess,
            params: { name, id: servicer.id, servicePricings: pricings },
          })
        );
      return dispatch(
        actions.createServicer({
          onSuccess,
          params: { name, servicePricings: pricings },
        })
      );
    },
    [dispatch, onSuccess, servicer]
  );
};
