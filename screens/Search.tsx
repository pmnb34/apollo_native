import React from "react";
import { View, Text, Button } from "react-native";

function Search({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Search Screen</Text>
      <Button title="Go to Search Detail" onPress={() => navigation.navigate("SearchDetail", { feedId: 3 })} />
    </View>
  );
}

export default Search;
