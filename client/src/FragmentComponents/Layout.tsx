import { Container } from "@material-ui/core";
import React from "react";
import { styled } from "@material-ui/core/styles";

const MyContainer = styled(Container)({
  textAlign: "center",
});

interface LayoutProps {
  children: React.ReactElement;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <MyContainer maxWidth="md">{children}</MyContainer>;
};

export default Layout;
