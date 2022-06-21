import { Alert, AlertTitle, Box, Button } from "@mui/material";

export interface ErrorHandlerProps {
  error?: Error | null;
  message?: string | null;
  reset?: () => void;
}

const ErrorHandler = ({ error, message, reset }: ErrorHandlerProps) => {
  return (
    <Box padding={4}>
      <Alert
        severity="error"
        action={
          reset ? (
            <Button color="inherit" size="small" onClick={reset}>
              reset
            </Button>
          ) : null
        }
      >
        <AlertTitle>ERROR</AlertTitle>
        {error?.message || message}
      </Alert>
    </Box>
  );
};

export default ErrorHandler;
