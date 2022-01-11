import {List, Typography, Box, CircularProgress} from "@mui/material";
import {useItemContext} from "../../context/ItemContextProvider";
import BuyItemListItem from "./BuyItemListItem";

const BuyItemList = () => {
    const {items, loading} = useItemContext();

    if (loading && !items.length) {
        return (
            <Box p={4} textAlign="center">
                <CircularProgress/>
            </Box>
        );
    }

    if (!items.length) {
        return (
            <Box p={4} textAlign="center" bgcolor="background.paper" borderRadius={1}>
                <Typography variant="h5" letterSpacing={2}>No items found!</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <List>
                {items && items.map((item) => <BuyItemListItem item={item} key={item.id}/>)}
            </List>
        </Box>
    );
};

export default BuyItemList;
