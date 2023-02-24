import React from "react";
import { Image } from "react-native";
import styled from "styled-components";

export default function LogoImage() {
  return <Logo resizeMode="contain" source={require("../../assets/logo.png")} />;
}
const Logo = styled(Image)`
  width: 100px;
  height: 80px;
  margin: 0 auto;
`;
