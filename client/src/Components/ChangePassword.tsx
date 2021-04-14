import { Box, TextField, Button } from "@material-ui/core";
import React from "react";
import { useState } from "react";

interface ChangePasswordProps {}

const ChangePassword: React.FC<ChangePasswordProps> = ({}) => {
  const [values, setValues] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <>
      <h2>Forgot password</h2>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Box marginY={3}>
          <TextField
            id="newPassword"
            label="New Password"
            type="newPassword"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />{" "}
        </Box>{" "}
        <Box marginY={3}>
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            type="confirmPassword"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />{" "}
        </Box>{" "}
        <Button variant="contained" color="primary" type="submit">
          {" "}
          Reset Password
        </Button>{" "}
      </form>
    </>
  );
};
export default ChangePassword;
