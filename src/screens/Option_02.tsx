import React from "react";
import { View, Text, Button } from "react-native";

function Option_02({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Option_02 Screen</Text>
      <Button title="Go to Option" onPress={() => navigation.navigate("MenuHome")} />
    </View>
  );
}

export default Option_02;
