import React from "react";
import { View, Text, Button } from "react-native";
import { isLoggedOutFn } from "../store";

function Option_01({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Option_01 Screen</Text>
      <Button title="Go to Option_02" onPress={() => navigation.navigate("MenuOption")} />
      <Button title="logout" onPress={() => isLoggedOutFn()} />
    </View>
  );
}

export default Option_01;
