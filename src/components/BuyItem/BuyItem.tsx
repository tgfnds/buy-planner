import { IconButton, ListItem, ListItemText } from "@mui/material";
import { MouseEvent } from "react";
import { useItemContext } from "../../context/ItemProvider";
import { BuyItem as BuyItemType } from "../../types";
import DeleteIcon from "@mui/icons-material/DeleteOutline";

interface BuyItemProps {
  item: BuyItemType;
}

const BuyItem = ({ item }: BuyItemProps) => {
  const { deleteItem } = useItemContext();

  function onDelete(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    item.id && deleteItem(item.id);
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
      <IconButton
        className="DeleteButton"
        color="error"
        sx={{
          left: -28,
          position: "absolute",
          opacity: 0,
        }}
        onClick={(e) => onDelete(e)}
      >
        <DeleteIcon />
      </IconButton>
      <ListItemText primary={item.name} />
      <ListItemText sx={{ textAlign: "end" }} primary={`${item.value} €`} />
    </ListItem>
  );
};

export default BuyItem;
