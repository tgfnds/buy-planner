import { List, Typography, Box } from "@mui/material";
import { useItemContext } from "../../context/ItemContextProvider";
import BuyItem from "./BuyItem";

const BuyItemList = () => {
  const { items } = useItemContext();

  function calcTotal() {
    if (!items.length) return;
    const values = items.map((item) => Number(item.value));
    const total = values.reduce((pv, cv) => (pv += cv));
    return total;
  }

  if (!items.length) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h4">Add new items!</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <List>
        {items && items.map((item) => <BuyItem item={item} key={item.id} />)}
      </List>
      {items.length > 0 && (
        <Typography mr={11.5} textAlign="end" fontWeight="bold">
          Total: {calcTotal()} €
        </Typography>
      )}
    </Box>
  );
};

export default BuyItemList;
