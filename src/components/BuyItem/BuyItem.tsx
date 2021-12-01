import { IconButton, ListItem, ListItemText } from "@mui/material";
import { MouseEvent } from "react";
import { useItemContext } from "../../context/ItemContextProvider";
import { BuyItem as BuyItemType } from "../../types";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";
import { useFormContext } from "../../context/FormContextProvider";

interface BuyItemProps {
  item: BuyItemType;
}

const BuyItem = ({ item }: BuyItemProps) => {
  const { setType, setItem } = useFormContext();
  const { deleteItem } = useItemContext();

  function onDelete(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    item.id && deleteItem(item.id);
  }

  function onEdit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setType("EDIT");
    setItem({
      id: item.id,
      name: item.name,
      value: item.value,
    });
  }

  return (
    <ListItem
      sx={{
        padding: "0.2rem 1rem",
        ":hover > .Actions": {
          opacity: 1,
        },
      }}
      disablePadding
    >
      <ListItemText primary={item.name} />
      <ListItemText sx={{ textAlign: "end" }} primary={`${item.value} €`} />
      <Box className="Actions" ml={1} display="flex">
        <IconButton color="secondary" size="small" onClick={(e) => onEdit(e)}>
          <EditIcon />
        </IconButton>
        <IconButton color="secondary" size="small" onClick={(e) => onDelete(e)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
};

export default BuyItem;
