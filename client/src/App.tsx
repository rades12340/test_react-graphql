import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Items from "./Components/Items";
import Layout from "./FragmentComponents/Layout";
import Header from "./FragmentComponents/Header";
import AddItem from "./Components/AddItem";
import { useAppDispatch } from "./store/store";
import { me } from "./reducers/userSlice";
import ForgotPassword from "./Components/ForgotPassword";
import CreatePassword from "./Components/ChangePassword";
import { CheckEmail } from "./Components/CheckEmail";
import ChangePassword from "./Components/ChangePassword";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <>
      <Header />
      <Layout>
        <Switch>
          <Redirect exact from="/" to="items" />
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/add">
            <AddItem />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/forgot">
            <ForgotPassword />
          </Route>

          <Route path="/change-password">
            <ChangePassword />
          </Route>
          <Route path="/check-email">
            <CheckEmail />
          </Route>
          <Route path="/items">
            <Items />
          </Route>
        </Switch>
      </Layout>
    </>
  );
}

export default App;
