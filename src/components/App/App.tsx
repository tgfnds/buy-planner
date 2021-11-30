import { CssBaseline, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import ItemProvider from "../../context/ItemProvider";
import { theme } from "../../theme";
import BuyItemForm from "../BuyItem/BuyItemForm";
import BuyItemList from "../BuyItem/BuyItemList";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ItemProvider>
        <Box
          display="flex"
          minHeight="100vh"
          minWidth="100vw"
          alignItems="center"
          justifyContent="center"
          bgcolor="background"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="600px"
            p={3}
            bgcolor="background.paper"
          >
            <BuyItemForm />
            <BuyItemList />
          </Box>
        </Box>
      </ItemProvider>
    </ThemeProvider>
  );
}

export default App;
