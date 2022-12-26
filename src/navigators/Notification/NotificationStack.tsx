import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Detail from "../../screens/Detail";
import Notification from "../../screens/Notification";

const Stack = createStackNavigator();

function NotificationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NotificationHome"
        options={{
          headerTitle: "알림",
          headerTitleAlign: "left",
        }}
        component={Notification}
      />
    </Stack.Navigator>
  );
}

export default NotificationStack;
