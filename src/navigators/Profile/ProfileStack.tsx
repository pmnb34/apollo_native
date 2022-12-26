import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Detail from "../../screens/Detail";
import Profile from "../../screens/Profile";
import { Button } from "react-native";
import ProfileDetail from "../../screens/ProfileDetail";

const Stack = createStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileHome"
        options={{
          headerTitle: "프로필",
          headerTitleAlign: "left",
          headerRight: () => <Button onPress={() => alert("This is a button!")} title="Info" color="red" />,
        }}
        component={Profile}
      />
      <Stack.Screen
        name="ProfileDetail"
        options={{ headerTitle: "프로필 피드 디테일", headerBackTitleVisible: false }}
        component={ProfileDetail}
      />
    </Stack.Navigator>
  );
}

export default ProfileStack;
