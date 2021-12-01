import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ItemProvider from "../../context/ItemProvider";
import BuyItemForm from "../BuyItem/BuyItemForm";
import BuyItemList from "../BuyItem/BuyItemList";
import { theme } from "../../theme";
import FormContextProvider from "../../context/FormContextProvider";

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
          <FormContextProvider>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="600px"
              p={5}
              borderRadius={2}
              bgcolor="background.paper"
            >
              <Typography variant="h1" fontSize={64} marginBottom={3}>
                BuyPlanner
              </Typography>
              <Box borderRadius={2}>
                <BuyItemForm />
              </Box>
              <Box
                width="100%"
                mt={2}
                bgcolor="background.default"
                borderRadius={1}
              >
                <BuyItemList />
              </Box>
            </Box>
          </FormContextProvider>
        </Box>
      </ItemProvider>
    </ThemeProvider>
  );
}

export default App;
