import {Box, Stack} from "@mui/material";
import BuyItemCounter from "../components/BuyItem/BuyItemCounter";
import BuyItemForm from "../components/BuyItem/BuyItemForm";
import BuyItemList from "../components/BuyItem/BuyItemList";
import ProgressBar from "../components/ui/ProgressBar";
import FormProvider from "../context/FormContextProvider";
import ItemContextProvider from "../context/ItemContextProvider";

const Home = () => {
    return (
        <ItemContextProvider>
            <FormProvider>
                <Stack alignItems="center" borderRadius={2}>
                    <BuyItemForm/>
                    <Box width="100%" mt={2} borderRadius={1}>
                        <ProgressBar/>
                        <BuyItemList/>
                    </Box>
                    <BuyItemCounter/>
                </Stack>
            </FormProvider>
        </ItemContextProvider>
    );
};

export default Home;
