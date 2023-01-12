import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components";

function SparatorContainer() {
  return (
    <TouchableWithoutFeedback>
      <Sparator></Sparator>
    </TouchableWithoutFeedback>
  );
}

export default SparatorContainer;

const Sparator = styled(View)`
  border: 0.5px solid #e9e9e9;
`;
