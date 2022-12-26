import React from "react";
import { Feather } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
const Container = styled(View)`
  flex-direction: row;
`;
const Btn = styled(TouchableOpacity)`
  margin-right: 20px;
  align-items: center;
  justify-content: center;
`;
useNavigation;
export default function HeaderBtn() {
  const navigation = useNavigation();
  return (
    <Container>
      <Btn
        onPress={() => {
          navigation.navigate("Write");
        }}
      >
        <Feather name="plus-square" size={24} color="black" />
      </Btn>
      <Btn
        onPress={() => {
          navigation.navigate("Menu");
        }}
      >
        <Feather name="menu" size={24} color="black" />
      </Btn>
    </Container>
  );
}
