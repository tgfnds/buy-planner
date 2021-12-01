import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    h1: {
      fontFamily: "comforter",
    },
  },
  palette: {
    mode: "dark",
    background: {
      default: "#292D3E",
      paper: "#34324a",
    },
    text: {
      primary: "#A6ACCD",
      secondary: "#676E95",
    },
    primary: {
      main: "#ab47bc",
    },
  },
});
