import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import { useSelector } from "react-redux";
import { Link as MyLink } from "react-router-dom";
import { logout } from "../reducers/userSlice";
import { RootState, useAppDispatch } from "../store/store";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    pusRight: {
      marginLeft: "auto",
    },
  })
);

function Header() {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const data = useSelector((state: RootState) => state.user);

  const logoutHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div>
            {data.user && data.user.email && (
              <Button
                component={MyLink}
                to="/add"
                color="secondary"
                variant="contained"
              >
                Add item
              </Button>
            )}

            <Button component={MyLink} to="/" color="inherit">
              Items
            </Button>
          </div>
          <div className={classes.pusRight}>
            {data.user && data.user.email ? (
              <Button
                component={MyLink}
                to="/register"
                color="inherit"
                onClick={logoutHandler}
              >
                Logout
              </Button>
            ) : (
              <>
                {" "}
                <Button component={MyLink} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={MyLink} to="/register" color="inherit">
                  Register
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
