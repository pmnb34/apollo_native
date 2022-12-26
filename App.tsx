import * as SplashScreen from "expo-splash-screen";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import client, { getAccToken } from "./src/apollo";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./src/navigators/StackNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLoggedInVar, themeVar, userIdVar, tokenVar, tokenTimeVar, tokenMethodVar } from "./src/store";
import { ThemeProvider } from "styled-components";
import Toast from "react-native-toast-message";
import { USERID, TOKEN, TOKEN_TIME, TOKEN_METHOD } from "./src/enum";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const theme = useReactiveVar(themeVar);
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  useEffect(() => {
    const preloadAssets = async () => {
      try {
        const userId = (await AsyncStorage.getItem(USERID)) || null;
        const token = (await AsyncStorage.getItem(TOKEN)) || null;
        const token_time = (await AsyncStorage.getItem(TOKEN_TIME)) || null;
        const token_method = (await AsyncStorage.getItem(TOKEN_METHOD)) || null;
        console.log(userId, token, token_time, token_method);
        if (userId && token && token_time && token_method) {
          isLoggedInVar(true);
          userIdVar(userId);
          tokenVar(token);
          tokenTimeVar(token_time);
          tokenMethodVar(token_method);
          getAccToken(userId, token, token_time, token_method);
        }
        const fontsToLoad = [Ionicons.font];
        const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
        const imagesToLoad = [require("./assets/logo.png")];
        const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
        Promise.all([...fontPromises, ...imagePromises]);
      } catch (e) {
      } finally {
        onFinish();
        await SplashScreen.hideAsync();
      }
    };
    preloadAssets();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <StackNav />
        </NavigationContainer>
        <Toast />
      </ThemeProvider>
    </ApolloProvider>
  );
}
