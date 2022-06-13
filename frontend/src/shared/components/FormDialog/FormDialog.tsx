import {
  Button,
  Dialog as BaseDialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  DialogContentText,
  Grid,
  styled,
} from "@mui/material";
import { SummaryEntry, DialogField } from "shared/types";
import FieldComponent from "./FieldComponent";

const Dialog = styled(BaseDialog)({
  "& .MuiPaper-root": {
    minHeight: 600,
  },
  "& .MuiDialogContent-root": {
    paddingTop: 20,
    overflowY: "hidden",
  },
});

const FieldsWrapper = styled(Grid)({
  "& >div": {
    marginBottom: 20,
  },
});

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
        <FieldsWrapper container direction="column">
          {fields.map((field) => (
            <Grid item>
              <FieldComponent {...field} />
            </Grid>
          ))}
        </FieldsWrapper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onConfirm}>{confirmLabel}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
