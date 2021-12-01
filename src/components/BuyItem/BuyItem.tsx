import { IconButton, ListItem, ListItemText } from "@mui/material";
import { MouseEvent, useState } from "react";
import { useItemContext } from "../../context/ItemContextProvider";
import { BuyItem as BuyItemType } from "../../types";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/EditOutlined";
import CancelIcon from "@mui/icons-material/CloseOutlined";
import ConfirmIcon from "@mui/icons-material/CheckOutlined";
import { Box } from "@mui/system";
import { useFormContext } from "../../context/FormContextProvider";
import { defaultState as defaultFormState } from "../../context/FormContext";

interface BuyItemProps {
  item: BuyItemType;
}

const BuyItem = ({ item }: BuyItemProps) => {
  const { setType, setData, data } = useFormContext();
  const { deleteItem } = useItemContext();
  const [isDeleting, setIsDeleting] = useState(false);

  function onDelete(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsDeleting(true);
  }

  function onConfirmDeletion(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    item.id && deleteItem(item.id);
    setIsDeleting(false);
    if (data.id === item.id) {
      setType("ADD");
      setData(defaultFormState.data);
    }
  }

  function onCancelDeletion(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsDeleting(false);
  }

  function onEdit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setType("EDIT");
    setData({
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
      <ListItemText
        primaryTypographyProps={{
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        primary={item.name}
      />
      <ListItemText
        primaryTypographyProps={{
          fontWeight: "bold",
        }}
        sx={{ marginLeft: 3, flex: "1 0 auto", textAlign: "end" }}
        primary={`${item.value} €`}
      />
      <Box className="Actions" ml={2} display="flex">
        {isDeleting ? (
          <IconButton
            color="error"
            size="small"
            onClick={(e) => onCancelDeletion(e)}
          >
            <CancelIcon fontSize="small" />
          </IconButton>
        ) : (
          <IconButton color="secondary" size="small" onClick={(e) => onEdit(e)}>
            <EditIcon fontSize="small" />
          </IconButton>
        )}
        {isDeleting ? (
          <IconButton
            color="success"
            size="small"
            onClick={(e) => onConfirmDeletion(e)}
          >
            <ConfirmIcon fontSize="small" />
          </IconButton>
        ) : (
          <IconButton
            color="secondary"
            size="small"
            onClick={(e) => onDelete(e)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </ListItem>
  );
};

export default BuyItem;
