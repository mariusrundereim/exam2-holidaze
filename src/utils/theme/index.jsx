import { createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  // primaryColor: "violet",
  fontFamily: "Albert Sans Variable, sans-serif",
  fontSizes: {
    xs: rem(16),
    sm: rem(18),
    md: rem(20),
    lg: rem(23),
    xl: rem(25),
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
