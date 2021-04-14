import classes from "*.module.css";
import {
  Box,
  Card,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getItems } from "../reducers/itemSlice";
import { RootState, useAppDispatch } from "../store/store";

const useStyles = makeStyles({
  card: {
    margin: "1.5rem",
    backgroundColor: indigo[50],
  },
  pos: {
    marginBottom: 12,
  },
});

interface ItemsProps {}

const Items: React.FC<ItemsProps> = ({}) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const data = useSelector((state: RootState) => state.item);

  useEffect(() => {
    dispatch(getItems());
  }, []);

  return (
    <div>
      {data.items &&
        data.items.map((el) => (
          <Box key={el.id}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {el.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {el.created_at}
                </Typography>
                <Typography variant="h5" component="h2">
                  {el.creator.email}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
    </div>
  );
};

export default Items;
