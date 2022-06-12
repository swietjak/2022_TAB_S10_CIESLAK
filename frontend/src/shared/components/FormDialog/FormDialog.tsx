import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  DialogContentText,
  Grid,
} from "@mui/material";
import { SummaryEntry, DialogField } from "shared/types";
import FormDatePicker from "../FormDatePicker";
import TextField from "../TextField";
import FieldComponent from "./FieldComponent";

interface FormDialogProps extends DialogProps {
  title: string;
  fields: DialogField[];
  summaryContent: SummaryEntry[];
  onConfirm: () => void;
  confirmLabel: string;
}

const FormDialog = ({
  title,
  summaryContent,
  fields,
  onConfirm,
  confirmLabel,
  ...props
}: FormDialogProps) => {
  const handleClose = () => {
    if (props.onClose) props.onClose({}, "backdropClick");
  };

  return (
    <Dialog {...props}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container direction="column" spacing={2}>
            {summaryContent.map((summaryContent) => (
              <Grid item container>
                <Grid item xs={6}>
                  {`${summaryContent.label}:`}&nbsp;
                </Grid>
                <Grid item xs={6}>
                  {summaryContent.value}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </DialogContentText>
        <Grid container direction="column" spacing={2}>
          {fields.map((field) => (
            <Grid item>
              <FieldComponent {...field} />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onConfirm}>{confirmLabel}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
