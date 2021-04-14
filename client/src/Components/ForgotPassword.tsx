import { Box, TextField, Button } from "@material-ui/core";
import React from "react";
import { useState } from "react";

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const [email, setEmail] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <>
      <h2>Forgot password</h2>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Box marginY={3}>
          <TextField
            id="email"
            label="Email"
            type="email"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />{" "}
        </Box>{" "}
        <Button variant="contained" color="primary" type="submit">
          {" "}
          Submit
        </Button>{" "}
      </form>
    </>
  );
};

export default ForgotPassword;
