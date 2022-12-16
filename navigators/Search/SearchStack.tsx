import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Feed from "../../screens/Feed";
import Detail from "../../screens/Detail";
import Search from "../../screens/Search";
import Notification from "../../screens/Notification";

const Stack = createStackNavigator();

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchHome"
        options={{
          headerTitleAlign: "left",
          headerTitle: () => <TextInput style={{ height: 40 }} placeholder="Type here to translate!" />,
        }}
        component={Search}
      />
      <Stack.Screen
        name="SearchDetail"
        options={{ headerTitle: "검색 디테일", headerBackTitleVisible: false }}
        component={Detail}
      />
    </Stack.Navigator>
  );
}

export default SearchStack;
