import createPalette, {
  PaletteOptions,
} from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    neutral: Palette["primary"];
  }

  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }
}

const palette: PaletteOptions = {
  primary: {
    light: "#334fcc",
    main: "#0023C0",
    dark: "#001886",
    contrastText: "#FFF",
  },
  secondary: {
    light: "#ed4b82",
    main: "#e91e63",
    dark: "#a31545",
    contrastText: "#FFF",
  },
  neutral: {
    light: "#F2F2F2",
    main: "#EBEBEB",
    dark: "#CBCBCB",
    contrastText: "rgba(0,0,0,0.8)",
  },
};

export default createPalette(palette);
