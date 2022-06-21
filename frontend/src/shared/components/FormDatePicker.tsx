import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useController, useFormContext } from "react-hook-form";

interface FormDatePickerProps {
  name: string;
  label?: string;
}

const DEFAULT_DATE_FORMAT = "yyyy-MM-dd";

const FormDatePicker = ({ name, label }: FormDatePickerProps) => {
  const { control } = useFormContext();
  const {
    field: fieldProps,
    fieldState: { error },
    //@ts-ignore
  } = useController({ control, name });
  return (
    <DatePicker
      {...fieldProps}
      label={label}
      inputFormat={DEFAULT_DATE_FORMAT}
      renderInput={(params) => (
        <TextField error={!!error} helperText={error?.message} {...params} />
      )}
      mask=""
    />
  );
};

export default FormDatePicker;
