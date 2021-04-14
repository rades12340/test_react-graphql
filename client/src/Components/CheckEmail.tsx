import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

interface CheckEmailProps {}

const useStyles = makeStyles({
  textMarginTop: {
    marginTop: "4.5rem",
  },
});

export const CheckEmail: React.FC<CheckEmailProps> = ({}) => {
  const classes = useStyles();
  return (
    <Typography align="center" className={classes.textMarginTop}>
      You should check your email password and follow instructions about
      changeing password
    </Typography>
  );
};
