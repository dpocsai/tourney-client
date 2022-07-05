import { Alert } from "@mui/material";

const AlertMessage = ({ severity, message }) => {
  return (
    <Alert
      severity={severity}
      sx={{
        width: { xs: "90%", sm: "60%", md: "50%", lg: "40%" },
        margin: "auto",
        borderColor: "primary.dark",
      }}
    >
      {message}
    </Alert>
  );
};

export default AlertMessage;
