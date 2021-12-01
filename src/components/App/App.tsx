import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ItemContextProvider from "../../context/ItemContextProvider";
import BuyItemForm from "../BuyItem/BuyItemForm";
import BuyItemList from "../BuyItem/BuyItemList";
import { theme } from "../../theme";
import FormContextProvider from "../../context/FormContextProvider";
import ProgressBar from "../ui/ProgressBar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ItemContextProvider>
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
                <ProgressBar />
                <BuyItemList />
              </Box>
            </Box>
          </FormContextProvider>
        </Box>
      </ItemContextProvider>
    </ThemeProvider>
  );
}

export default App;
