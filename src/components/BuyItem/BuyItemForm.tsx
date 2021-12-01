import { Button, InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent, MouseEvent, useEffect, useRef } from "react";
import { defaultState } from "../../context/FormContext";
import { useFormContext } from "../../context/FormContextProvider";
import { useItemContext } from "../../context/ItemContextProvider";

const BuyItemForm = () => {
  const { type, data: item, setData: setItem, setType } = useFormContext();
  const { addItem, updateItem } = useItemContext();

  const nameRef = useRef<HTMLInputElement | null>(null);

  const isSubmitDisabled = () => (!item.name || !item.value) ?? true;

  function onClear() {
    setItem(defaultState.data);
    setType("ADD");
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const pattern = e.target.pattern;
    const value = e.target.value;

    if (pattern) {
      if (value.match(pattern)) {
        setItem({
          ...item,
          [e.target.name]: value,
        });
      }
      return;
    }

    setItem({
      ...item,
      [e.target.name]: value,
    });
  }

  function onSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (type === "ADD") addItem(item);
    else if (type === "EDIT") updateItem(item);
    setItem(defaultState.data);
    nameRef.current?.focus();
    setType("ADD");
  }

  useEffect(() => {
    nameRef.current?.focus();
  }, [type]);

  return (
    <Box component="form" noValidate autoComplete="off" display="flex" gap={2}>
      <TextField
        sx={{ flex: 3 }}
        inputRef={nameRef}
        size="small"
        name="name"
        label="Name"
        value={item.name}
        onChange={onChange}
        inputProps={{ pattern: "^.{0,100}$" }}
        variant="outlined"
      />
      <TextField
        sx={{ flex: 2 }}
        size="small"
        name="value"
        label="Value"
        value={item.value}
        onChange={onChange}
        inputProps={{ inputMode: "numeric", pattern: "^[0-9]{0,10}$" }}
        variant="outlined"
        InputProps={{
          endAdornment: <InputAdornment position="end">€</InputAdornment>,
        }}
      />
      <Box display="flex" gap={1}>
        {type === "EDIT" && (
          <Button variant="outlined" color="error" onClick={onClear}>
            Clear
          </Button>
        )}
        <Button
          variant="outlined"
          onClick={onSubmit}
          type="submit"
          color="success"
          disabled={isSubmitDisabled()}
        >
          {type}
        </Button>
      </Box>
    </Box>
  );
};

export default BuyItemForm;
