import { createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  // primaryColor: "violet",
  fontFamily: "Albert Sans Variable, sans-serif",
  fontSizes: {
    xs: rem(18),
    sm: rem(21),
    md: rem(22),
    lg: rem(25),
    xl: rem(30),
  },
  headings: {
    // properties for all headings
    fontWeight: "600",
    fontFamily: "Albert Sans Variable, sans-serif",

    // properties for individual headings, all of them are optional
    sizes: {
      h1: {
        fontWeight: "800",
        fontSize: rem(42),
        lineHeight: "1.4",
      },
      h2: {
        fontWeight: "600",
        fontSize: rem(38),
        lineHeight: "1.4",
      },
      // ...up to h6
      h6: { fontWeight: "900" },
    },
  },
});
