import { Button, InputAdornment, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { useItemContext } from "../../context/ItemProvider";
import { BuyItem } from "../../types";

interface FormState {
  name: string;
  value: string;
}

const defaultState = {
  name: "",
  value: "",
};

const BuyItemForm = () => {
  const { addItem } = useItemContext();
  const [state, setState] = useState<FormState>(defaultState);

  const nameRef = useRef<HTMLInputElement | null>(null);

  const isSubmitDisabled = () => (!state.name || !state.value) ?? true;

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const pattern = e.target.pattern;
    const value = e.target.value;

    if (pattern) {
      if (value.match(pattern)) {
        setState({
          ...state,
          [e.target.name]: value,
        });
      }
      return;
    }

    setState({
      ...state,
      [e.target.name]: value,
    });
  }

  function onSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const item: BuyItem = {
      name: state.name,
      value: Number(state.value),
    };
    addItem(item);
    setState(defaultState);
    nameRef.current?.focus();
  }

  return (
    <Box component="form" noValidate autoComplete="off" display="flex" gap={2}>
      <TextField
        inputRef={nameRef}
        size="small"
        name="name"
        label="Name"
        value={state.name}
        onChange={onChange}
        inputProps={{ pattern: "^.{0,100}$" }}
        variant="outlined"
      />
      <TextField
        size="small"
        name="value"
        label="Value"
        value={state.value}
        onChange={onChange}
        inputProps={{ inputMode: "numeric", pattern: "^[0-9]{0,10}$" }}
        variant="outlined"
        InputProps={{
          endAdornment: <InputAdornment position="end">€</InputAdornment>,
        }}
      />
      <Button
        variant="outlined"
        onClick={onSubmit}
        type="submit"
        color="success"
        disabled={isSubmitDisabled()}
      >
        Add
      </Button>
    </Box>
  );
};

export default BuyItemForm;
