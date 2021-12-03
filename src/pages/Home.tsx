import { Box } from "@mui/material";
import BuyItemCounter from "../components/BuyItem/BuyItemCounter";
import BuyItemForm from "../components/BuyItem/BuyItemForm";
import BuyItemList from "../components/BuyItem/BuyItemList";
import ProgressBar from "../components/ui/ProgressBar";
import FormContextProvider from "../context/FormContextProvider";
import ItemContextProvider from "../context/ItemContextProvider";

const Home = () => {
  return (
    <ItemContextProvider>
      <FormContextProvider>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="600px"
          px={5}
          borderRadius={2}
          bgcolor="background.paper"
        >
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
          <BuyItemCounter />
        </Box>
      </FormContextProvider>
    </ItemContextProvider>
  );
};

export default Home;
