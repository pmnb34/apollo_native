import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components";

function AuthorContainer() {
  return (
    <TouchableWithoutFeedback>
      <Ahthor>
        <Avatar resizeMode="contain" source={require("../../../assets/logo.png")} />
        <Name>굿스마일</Name>
      </Ahthor>
    </TouchableWithoutFeedback>
  );
}

export default AuthorContainer;

const Ahthor = styled(View)`
  flex-direction: row;
  align-items: center;
`;
const Avatar = styled(Image)`
  width: 60px;
  height: 60px;
  margin-right: 12px;
`;
const Name = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
`;
