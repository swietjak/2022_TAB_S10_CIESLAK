

export enum LoginFormFields {
    Username = "username",
    Password = "password"
  }
  
export interface LoginFormValues {
    [LoginFormFields.Username]: string;
    [LoginFormFields.Password]: string;
  }

  export const defaultValues: LoginFormValues = {
    username: "",
    password:""
  }

  export const onSubmitLogin = (values: LoginFormValues) => console.log(values)
