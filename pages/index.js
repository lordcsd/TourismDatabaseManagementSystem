import Homepage from "./homePage";
import { createMuiTheme,ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(42, 42, 71)",
    },
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Homepage />;
    </ThemeProvider>
  );
}
