import React from "react";
import { Image } from "react-native";
import styled from "styled-components";

export default function LogoImage() {
  return <Logo resizeMode="contain" source={require("../../assets/logo.png")} />;
}
const Logo = styled(Image)`
  max-width: 50%;
  width: 100%;
  height: 60%;
  margin: 0 auto;
`;
