import { Box, Link as MyLink, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import {
  loginUser,
  resetErrors,
  setLoginError,
  setUser,
} from "../reducers/userSlice";
import { RootState, useAppDispatch } from "../store/store";
import { unwrapResult } from "@reduxjs/toolkit";

interface LoginProps {}

interface FulfilledAction<ThunkArg, PromiseResult> {
  type: string;
  payload: PromiseResult;
  meta: {
    requestId: string;
    arg: ThunkArg;
  };
}

const Login: React.FC<LoginProps> = ({}) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(userData))
      .then(unwrapResult)
      .then((x) => {
        if (x.login.errors) {
          dispatch(setLoginError(x.login.errors));
        } else {
          dispatch(setUser(x.login.user));
          dispatch(resetErrors());
          history.push("/add");
        }
      });
  };

  let emailMessage = "";
  let passwordMessage = "";
  if (data.loginErrors) {
    for (let error of data.loginErrors) {
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
      <h2>Login page</h2>
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
        <Box paddingBottom={2}>
          <MyLink
            to="/forgot"
            component={Link}
            variant="body2"
            onClick={() => {
              console.info("I'm a button.");
            }}
          >
            Forgot password?
          </MyLink>
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </>
  );
};

export default Login;
