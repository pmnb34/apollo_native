import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Detail from "../../screens/Detail";
import Profile from "../../screens/Profile";
import { Button } from "react-native";
import Login from "../../screens/Login";
import Register from "../../components/login/Register";
import Kakao from "../../components/login/Kakao";

const Stack = createStackNavigator();

function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        options={{
          headerTitle: "로그인",
        }}
        component={Login}
      />
      <Stack.Screen
        name="Register"
        options={{ headerTitle: "회원가입", headerBackTitleVisible: false }}
        component={Register}
      />
      <Stack.Screen name="Kakao" options={{ headerTitle: "카카오", headerBackTitleVisible: false }} component={Kakao} />
    </Stack.Navigator>
  );
}

export default LoginStack;
