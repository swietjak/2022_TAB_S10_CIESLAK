import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  DialogContentText,
  TextField,
  Grid,
} from "@mui/material";
import { SummaryEntry, DialogField } from "shared/types";
import { DatePicker } from "@mui/x-date-pickers";
import FormDatePicker from "./FormDatePicker";

interface FormDialogProps extends DialogProps {
  title: string;
  mainContent: string;
  fields: DialogField[];
  summaryContent: SummaryEntry[];
  onConfirm: () => void;
}

const FormDialog = ({
  title,
  mainContent,
  summaryContent,
  fields,
  onConfirm,
  ...props
}: FormDialogProps) => {
  const DEFAULT_DATE_FORMAT = "yyyy-MM-dd";

  const handleClose = () => {
    if (props.onClose) props.onClose({}, "backdropClick");
  };

  return (
    <>
      <Dialog {...props}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <>
            <DialogContentText>
              <>
                {mainContent}
                <hr />
                {summaryContent.map(
                  (summaryContent) =>
                    summaryContent.label + ": " + summaryContent.value && <hr />
                )}
              </>
            </DialogContentText>
            {fields.map((fields) => {
              if (fields.type !== "date") {
                <TextField
                  autoFocus
                  margin="dense"
                  id={fields.name}
                  label={fields.label}
                  type={fields.type}
                  fullWidth
                  variant="standard"
                />;
              } else {
                <FormDatePicker name={fields.label} />;
              }
            })}
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onConfirm}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormDialog;
