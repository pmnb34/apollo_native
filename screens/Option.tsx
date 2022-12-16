import React from "react";
import { View, Text, Button } from "react-native";

function Option({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Option Screen</Text>
      <Button title="Go to Option_01" onPress={() => navigation.navigate("MenuDetail")} />
    </View>
  );
}

export default Option;
