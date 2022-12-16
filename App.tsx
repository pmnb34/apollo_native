import * as SplashScreen from "expo-splash-screen";
import { ApolloProvider } from "@apollo/client";
import React, { useEffect, useState } from "react";
import client from "./apollo";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./navigators/StackNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLoggedInVar, tokenVar } from "./store";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);

  useEffect(() => {
    const preloadAssets = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log(token);
        if (token) {
          isLoggedInVar(true);
          tokenVar(token);
        }
        const fontsToLoad = [Ionicons.font];
        const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
        const imagesToLoad = [require("./assets/logo.png")];
        const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
        Promise.all([...fontPromises, ...imagePromises]);
      } catch (e) {
        console.log(e);
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
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </ApolloProvider>
  );
}
