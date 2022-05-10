import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { object, SchemaOf, string } from "yup";
import { actions } from "shared/store";

export enum LoginFormFields {
  Email = "email",
  Password = "password",
}

export interface LoginFormValues {
  [LoginFormFields.Email]: string;
  [LoginFormFields.Password]: string;
}

export const defaultValues: LoginFormValues = {
  email: "",
  password: "",
};

export const validationSchema: SchemaOf<LoginFormValues> = object().shape({
  [LoginFormFields.Email]: string().required(),
  [LoginFormFields.Password]: string().required(),
});

export const useLoginForm = () =>
  useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  });

export const useOnLoginSubmit = () => {
  const dispatch = useDispatch();

  return useCallback(
    ({ email, password }: LoginFormValues) =>
      dispatch(actions.login({ login: email, password })),
    [dispatch]
  );
};
