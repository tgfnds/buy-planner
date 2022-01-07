import {IconButton, ListItem, ListItemText, Tooltip} from "@mui/material";
import {MouseEvent, useState} from "react";
import {useItemContext} from "../../context/ItemContextProvider";
import {IBuyItem} from "../../types";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/EditOutlined";
import CancelIcon from "@mui/icons-material/CloseOutlined";
import ConfirmIcon from "@mui/icons-material/CheckOutlined";
import {Box} from "@mui/system";
import {useFormContext} from "../../context/FormContextProvider";
import {defaultState as defaultFormState} from "../../context/FormContext";
import NumberFormat from "react-number-format";

interface IBuyItemProps {
    item: IBuyItem;
}

const BuyItem = ({item}: IBuyItemProps) => {
    const {setEditItem, editItem} = useFormContext();
    const {deleteItem} = useItemContext();
    const [isDeleting, setIsDeleting] = useState(false);

    function onDelete(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setIsDeleting(true);
    }

    function onConfirmDeletion(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        item.id && deleteItem(item.id);
        setIsDeleting(false);
        if (editItem?.id === item.id) {
            setEditItem(defaultFormState.editItem);
        }
    }

    function onCancelDeletion(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setIsDeleting(false);
    }

    function onEdit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setEditItem(item);
    }

    return (
        <ListItem disableGutters
                  sx={{
                      paddingInline: 1.5,
                      paddingBlock: 0.5,
                      marginBlock: 1.2,
                      borderRadius: 1,
                      backgroundColor: "background.paper"
                  }}>
            <Tooltip title={item.name} enterDelay={1000}>
                <ListItemText primaryTypographyProps={{overflow: "hidden", textOverflow: "ellipsis"}}
                              primary={item.name}/>
            </Tooltip>
            <ListItemText primaryTypographyProps={{fontWeight: "bold"}}
                          sx={{marginLeft: 3, flex: "1 0 auto", textAlign: "end"}}
                          primary={
                              <NumberFormat displayType="text" thousandSeparator=" " value={item.value} suffix=" €"/>
                          }/>
            <Box className="Actions" ml={2} display="flex">
                {isDeleting ? (
                    <IconButton color="error" size="small" onClick={onCancelDeletion}>
                        <CancelIcon fontSize="small"/>
                    </IconButton>
                ) : (
                    <IconButton color="secondary" size="small" onClick={onEdit}>
                        <EditIcon fontSize="small"/>
                    </IconButton>
                )}
                {isDeleting ? (
                    <IconButton color="success" size="small" onClick={onConfirmDeletion}>
                        <ConfirmIcon fontSize="small"/>
                    </IconButton>
                ) : (
                    <IconButton color="secondary" size="small" onClick={onDelete}>
                        <DeleteIcon fontSize="small"/>
                    </IconButton>
                )}
            </Box>
        </ListItem>
    );
};

export default BuyItem;
