import React from "react";
import { View, Text, Button } from "react-native";

function Profile({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
      <Button title="Go to ProfileDetail" onPress={() => navigation.navigate("ProfileDetail", { feedId: 2 })} />
    </View>
  );
}

export default Profile;
