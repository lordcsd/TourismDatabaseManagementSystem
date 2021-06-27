import Homepage from "./homePage";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(42, 42, 51)",
    },
    secondary: {
      main: "#24e29a",
    },
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Homepage />
    </ThemeProvider>
  );
}
