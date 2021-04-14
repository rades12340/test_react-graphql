import { Box, Button, TextField } from "@material-ui/core";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  registerUser,
  resetErrors,
  setRegisterError,
  setUser,
} from "../reducers/userSlice";
import { RootState, useAppDispatch } from "../store/store";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [userData, setUserData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );

  const data = useSelector((state: RootState) => state.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prevValues) => ({
      ...prevValues,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(registerUser(userData))
      .then(unwrapResult)
      .then((x) => {
        if (x.register.errors) {
          dispatch(setRegisterError(x.register.errors));
        } else {
          dispatch(setUser(x.register.user));
          history.push("/add");
        }
      });
  };

  let emailMessage = "";
  let passwordMessage = "";

  if (data.registerErrors) {
    for (let error of data.registerErrors) {
      if (error.field === "email") {
        emailMessage = error.message;
      }
      if (error.field === "password") {
        passwordMessage = error.message;
      }
    }
  }

  return (
    <>
      <h2>Register Page</h2>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Box marginY={3}>
          <TextField
            error={!!emailMessage}
            id="email"
            label="Email"
            type="email"
            helperText={emailMessage}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box marginY={3}>
          <TextField
            error={!!passwordMessage}
            id="password"
            label="Password"
            type="password"
            helperText={passwordMessage}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </form>
    </>
  );
};

export default Register;
