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

interface FormDialogProps extends DialogProps {
  title: string;
  mainContent: string;
  fields: DialogField[];
  summaryContent: SummaryEntry[];
  onConfirm: () => void;
}

export default function FormDialog({
  title,
  mainContent,
  summaryContent,
  fields,
  onConfirm,
  ...props
}: FormDialogProps) {
  const handleClose = () => {
    if (props.onClose) props.onClose({}, "backdropClick");
  };

  return (
    <>
      <Dialog {...props}>
        <DialogTitle>Subscribe</DialogTitle>
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
              <TextField
                autoFocus
                margin="dense"
                id={fields.name}
                label={fields.label}
                type={fields.type}
                fullWidth
                variant="standard"
              />;
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
}
