import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent, useState } from "react";

interface FormState {
  name: string;
  value: string;
}

const BuyItemForm = () => {
  const [state, setState] = useState<FormState>({} as FormState);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <Box component="form" noValidate autoComplete="off" display="flex" gap={2}>
      <TextField
        label="Name"
        value={state.name}
        onChange={onChange}
        variant="standard"
      />
      <TextField
        label="Value"
        value={state.value}
        onChange={onChange}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        variant="standard"
      />
      <Button variant="contained">Add</Button>
    </Box>
  );
};

export default BuyItemForm;
