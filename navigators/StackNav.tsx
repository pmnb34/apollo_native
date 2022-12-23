import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import WriteStack from "./Write/WriteStack";
import MenuStack from "./Menu/MenuStack";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { refresh, tokenMethodVar, tokenVar } from "../store";

const Stack = createStackNavigator();

function StackNav() {
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{
        headerShown: false,
        presentation: "modal",
      }}
    >
      <Stack.Screen name="Tabs" component={TabsNav} />
      <Stack.Screen name="Write" component={WriteStack} />
      <Stack.Screen name="Menu" component={MenuStack} />
    </Stack.Navigator>
  );
}

export default StackNav;
