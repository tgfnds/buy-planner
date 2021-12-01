import { List, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useItemContext } from "../../context/ItemContextProvider";
import BuyItem from "./BuyItem";

const BuyItemList = () => {
  const { items } = useItemContext();

  if (!items) {
    return (
      <Box p={2} textAlign="center">
        <Typography variant="h4">Add new items!</Typography>
      </Box>
    );
  }

  return (
    <List sx={{ width: "100%" }}>
      {items && items.map((item) => <BuyItem item={item} key={item.id} />)}
    </List>
  );
};

export default BuyItemList;
