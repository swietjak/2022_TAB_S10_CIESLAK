import {
  MenuItem,
  Select as BaseSelect,
  SelectProps as BaseSelectProps,
} from "@mui/material";
import { useFormContext, useController } from "react-hook-form";
import { FieldValue } from "shared/types";

export type SelectProps = Partial<BaseSelectProps> & {
  name: string;
  options: FieldValue[];
  defaultValue?: string | number;
};

const Select = ({
  name,
  options,
  defaultValue,
  ...selectProps
}: SelectProps) => {
  const { control } = useFormContext();

  const {
    field: { ref, ...inputProps },
    fieldState: { error },
    //@ts-ignore
  } = useController({ control, name, defaultValue });

  return (
    <BaseSelect inputRef={ref} error={!!error} {...inputProps} {...selectProps}>
      {options.map(({ value, label }) => (
        <MenuItem value={value}>{label}</MenuItem>
      ))}
    </BaseSelect>
  );
};

export default Select;
