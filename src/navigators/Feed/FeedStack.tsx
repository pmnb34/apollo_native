import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Feed from "../../screens/Feed";
import Detail from "../../screens/Detail";
import HeaderBtn from "../../components/HeaderBtn";

const Stack = createStackNavigator();

function FeedStack({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FeedHome"
        options={{
          headerTitle: "피드",
          headerTitleAlign: "left",
          headerRight: () => <HeaderBtn navigation />,
        }}
        component={Feed}
      />
      <Stack.Screen
        name="FeedDetail"
        options={{ headerTitle: "피드디테일", headerBackTitleVisible: false }}
        component={Detail}
      />
    </Stack.Navigator>
  );
}

export default FeedStack;
