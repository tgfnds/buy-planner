import {
  Button,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent, FormEvent, useEffect, useRef } from "react";
import { useAuthContext } from "../../context/AuthContextProvider";
import { defaultState } from "../../context/FormContext";
import { useFormContext } from "../../context/FormContextProvider";
import { useItemContext } from "../../context/ItemContextProvider";
import { IBuyItem } from "../../types";
import { useFormik } from "formik";
import { BuyItemSchema } from "../../schemas/BuyItemSchema";
import NumberFormat from "react-number-format";

const SmallTextField = (props: TextFieldProps) => (
  <TextField {...props} size="small" />
);

const BuyItemForm = () => {
  const { editItem, setEditItem } = useFormContext();
  const { addItem, updateItem } = useItemContext();
  const { user } = useAuthContext();
  const {
    resetForm,
    setValues,
    submitForm,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    isValid,
  } = useFormik<IBuyItem>({
    initialValues: {
      name: editItem ? editItem.name : "",
      value: editItem ? editItem.value : "",
    },
    validationSchema: BuyItemSchema,
    onSubmit: (values) => {
      if (!editItem) {
        const newItem: IBuyItem = {
          name: values.name,
          value: values.value,
          userId: user?.uid,
        };
        addItem(newItem);
      } else {
        const newItem: IBuyItem = {
          ...editItem,
          name: values.name,
          value: values.value,
        };
        updateItem(newItem);
      }
      setEditItem(defaultState.editItem);
      resetForm();
    },
  });

  const nameRef = useRef<HTMLInputElement | null>(null);

  function onClear() {
    setEditItem(defaultState.editItem);
    resetForm();
  }

  useEffect(() => {
    if (editItem) {
      setValues(editItem, false);
    } else {
      resetForm();
    }
    nameRef.current?.focus();
  }, [editItem, setValues, resetForm]);

  return (
    <Box
      component="form"
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submitForm();
      }}
      noValidate
      autoComplete="off"
      display="flex"
      gap={2}
    >
      <TextField
        sx={{ flex: 3 }}
        inputRef={nameRef}
        size="small"
        name="name"
        label="Name"
        value={values.name}
        onChange={handleChange}
        error={touched.name && values.name.length > 0 && Boolean(errors.name)}
        inputProps={{ onBlur: handleBlur }}
        variant="outlined"
      />
      <NumberFormat
        customInput={SmallTextField}
        sx={{ flex: 2 }}
        variant="outlined"
        error={
          touched.value && values.value.length > 0 && Boolean(errors.value)
        }
        inputProps={{
          onBlur: handleBlur,
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">€</InputAdornment>,
        }}
        label="Value"
        name="value"
        value={values.value}
        allowNegative={false}
        maxLength={9}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.value.match(e.target.pattern)) handleChange(e);
        }}
        decimalScale={2}
        thousandSeparator=" "
      />
      {/* <TextField
        sx={{ flex: 2 }}
        size="small"
        name="value"
        label="Value"
        value={values.value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.value.match(e.target.pattern)) handleChange(e);
        }}
        error={
          touched.value && values.value.length > 0 && Boolean(errors.value)
        }
        inputProps={{
          inputMode: "numeric",
          pattern: "^[0-9.]{0,12}$",
          onBlur: handleBlur,
        }}
        variant="outlined"
        InputProps={{
          endAdornment: <InputAdornment position="end">€</InputAdornment>,
        }}
      /> */}
      <Box display="flex" gap={1}>
        {editItem && (
          <Button variant="outlined" color="error" onClick={onClear}>
            Clear
          </Button>
        )}
        <Button
          variant="outlined"
          type="submit"
          color="success"
          disabled={!isValid}
        >
          {editItem ? "SAVE" : "ADD"}
        </Button>
      </Box>
    </Box>
  );
};

export default BuyItemForm;
