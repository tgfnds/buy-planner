import { List } from "@mui/material";
import { useItemContext } from "../../context/ItemProvider";
import BuyItem from "./BuyItem";

const BuyItemList = () => {
  const { items } = useItemContext();

  return (
    <List sx={{ width: "100%" }}>
      {items && items?.map((item) => <BuyItem item={item} key={item.id} />)}
    </List>
  );
};

export default BuyItemList;
