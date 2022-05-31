import { DialogField, DialogFieldType } from "shared/types";
import FormDatePicker from "../FormDatePicker";
import TextField from "../TextField";

const FieldComponent = (field: DialogField) => {
  if (field.type === "date") return <FormDatePicker name={field.name} />;

  return <TextField {...field} />;
};

export default FieldComponent;
