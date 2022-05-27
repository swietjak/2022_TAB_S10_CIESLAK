import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
} from "@mui/material";

interface ConfirmationDialogProps extends DialogProps {
  mainContent: string;
  onConfirm: () => void;
}

const ConfirmationDialog = ({
  mainContent,
  onConfirm,
  ...props
}: ConfirmationDialogProps) => {
  const handleClose = () => {
    if (props.onClose) props.onClose({}, "backdropClick");
  };
  return (
    <Dialog {...props}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>{mainContent}</DialogContent>
      <DialogActions>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Button onClick={handleClose}>No</Button>
          </Grid>
          <Grid item>
            <Button onClick={onConfirm}>Yes</Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
