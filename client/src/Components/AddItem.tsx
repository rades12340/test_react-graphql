import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addItem } from "../reducers/itemSlice";
import { RootState, useAppDispatch } from "../store/store";

interface AddItemProps {}

const AddItem: React.FC<AddItemProps> = ({}) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");
  const data = useSelector((state: RootState) => state.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.user) {
      history.push("/login");
      return;
    }
    if (title === "") {
      return;
    }
    dispatch(addItem(title));
    setTitle("");
    history.push("/items");
  };

  return (
    <>
      <h2>Add item page</h2>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Box marginY={3}>
          <TextField
            error={!!error}
            id="title"
            label="title"
            type="text"
            helperText={error}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        <Button variant="contained" color="primary" type="submit">
          Add Item
        </Button>
      </form>
    </>
  );
};

export default AddItem;
