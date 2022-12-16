import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Option from "../../screens/Option";
import Option_02 from "../../screens/Option_02";
import Option_01 from "../../screens/Option_01";

const Stack = createStackNavigator();

function MenuStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MenuHome"
        options={{
          headerTitle: "메뉴",
          headerBackTitleVisible: false,
        }}
        component={Option}
      />
      <Stack.Screen
        name="MenuDetail"
        options={{ headerTitle: "메뉴1", headerBackTitleVisible: false }}
        component={Option_01}
      />
      <Stack.Screen
        name="MenuOption"
        options={{ headerTitle: "메뉴2", headerBackTitleVisible: false }}
        component={Option_02}
      />
    </Stack.Navigator>
  );
}

export default MenuStack;
