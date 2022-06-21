import { DialogField } from "shared/types";
import FormAutocomplete from "../FormAutocomplete";
import FormDatePicker from "../FormDatePicker";
import TextField from "../TextField";

const FieldComponent = (field: DialogField) => {
  if (field.type === "date")
    return <FormDatePicker label={field.label} name={field.name} />;
  if (field.type === "autocomplete" && !!field.getOptions)
    return (
      <FormAutocomplete
        name={field.name}
        getOptions={field.getOptions}
        label={field.label}
      />
    );

  return <TextField {...field} />;
};

export default FieldComponent;
