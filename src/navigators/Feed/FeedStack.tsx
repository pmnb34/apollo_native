import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Feed from "../../screens/Feed";
import Detail from "../../screens/Detail";
import HeaderBtn from "../../components/HeaderBtn";
import LogoImage from "../../components/logo";

const Stack = createStackNavigator();

function FeedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FeedHome"
        options={{
          headerTitle: () => <LogoImage />,
          headerTitleAlign: "left",
          headerRight: () => <HeaderBtn />,
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
