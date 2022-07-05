import { createTheme } from "@mui/material";
import { grey, blueGrey, lightBlue } from "@mui/material/colors";

export const theme = (toggleDark) => {
  let mode = toggleDark ? "dark" : "light";
  localStorage.setItem("mode", mode);

  return createTheme({
    palette: {
      mode,
      primary: {
        main: lightBlue[400],
        contrastText: "#fff",
      },
      secondary: {
        main: grey[600],
        contrastText: "#fff",
      },
      background: {
        paper: mode === "light" ? blueGrey[100] : blueGrey[900],
        default: mode === "light" ? grey[100] : grey[900],
      },
    },
    typography: {
      overline: {
        fontWeight: mode === "light" ? 700 : 400,
      },
    },
  });
};
