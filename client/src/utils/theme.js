import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  xl: "1450px",
  lg: "1100px",
  md: "900px",
  sm: "600px",
  xs: "500px",
  xxs: "300px",
});

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config, breakpoints });

export default theme;
