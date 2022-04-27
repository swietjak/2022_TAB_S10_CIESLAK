import { createTheme, Theme } from "@mui/material";
import palette from "./palette";

const SPACING = 8;
const theme: Theme = createTheme({ palette, spacing: SPACING });

export default theme;
