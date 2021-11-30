import { Button, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { MouseEvent } from "react";
import { useItemContext } from "../../context/ItemProvider";
import { BuyItem as BuyItemType } from "../../types";

interface BuyItemProps {
  item: BuyItemType;
}

const BuyItem = ({ item }: BuyItemProps) => {
  const { deleteItem } = useItemContext();

  function onDelete(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    deleteItem(item.id);
  }

  return (
    <ListItem
      sx={{
        borderRadius: 1,
        padding: "0.4rem 1rem",
        margin: "0.4rem 0",
        minWidth: 500,
        justifyContent: "space-between",
        ":hover > .DeleteButton": {
          opacity: 1,
        },
      }}
      disablePadding
    >
      <Button
        className="DeleteButton"
        variant="text"
        sx={{
          padding: "0.4rem 1rem",
          margin: "0.4rem 0",
          marginLeft: -12,
          position: "absolute",
          opacity: 0,
          color: red[700],
        }}
        onClick={(e) => onDelete(e)}
      >
        Delete
      </Button>
      <ListItemText primary={item.name} />
      <ListItemText sx={{ textAlign: "end" }} primary={`${item.value} €`} />
    </ListItem>
  );
};

export default BuyItem;
