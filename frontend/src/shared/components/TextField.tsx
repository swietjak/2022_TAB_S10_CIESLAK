import { useFormContext, useController } from "react-hook-form";
import {
  TextField as BaseTextField,
  TextFieldProps as BaseTextFieldProps,
  makeStyles,
} from "@mui/material";

export type TextFieldProps = Partial<BaseTextFieldProps> & {
  name: string;
  defaultValue?: string | number;
};

const useStyles = makeStyles({
  root: {
    whiteSpace: "nowrap",
  },
});

const TextField = ({
  name,
  label,
  defaultValue = "",
  ...props
}: TextFieldProps) => {
  const { control } = useFormContext();
  const {
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({ control, name, defaultValue });
  return (
    <BaseTextField
      label={label}
      inputRef={ref}
      error={!!error}
      helperText={error?.message}
      InputLabelProps={{ shrink: true }}
      {...inputProps}
      {...props}
    />
  );
};

export default TextField;
