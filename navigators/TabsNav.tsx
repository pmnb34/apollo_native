import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeedStack from "./Feed/FeedStack";
import SearchStack from "./Search/SearchStack";
import NotificationStack from "./Notification/NotificationStack";
import ProfileStack from "./Profile/ProfileStack";
import LoginStack from "./Login/LoginStack";
import { isLoggedInVar } from "../store";
import { useReactiveVar } from "@apollo/client";

const Tabs = createBottomTabNavigator();

function TabsNav() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  console.log(isLoggedIn);
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        activeTintColor: "white",
        showLabel: false,
        style: {
          borderTopColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: "black",
        },
      }}
    >
      <Tabs.Screen name="Home" component={FeedStack} />
      <Tabs.Screen name="Search" component={SearchStack} />
      {isLoggedIn ? (
        <>
          <Tabs.Screen name="Notification" component={NotificationStack} />
          <Tabs.Screen name="Profile" component={ProfileStack} />
        </>
      ) : (
        <>
          <Tabs.Screen name="Notification" component={LoginStack} />
          <Tabs.Screen name="로그인" component={LoginStack} />
        </>
      )}
    </Tabs.Navigator>
  );
}
export default TabsNav;
