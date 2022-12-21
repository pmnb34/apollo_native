import { makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN } from "./enum";
import { light, dark } from "./styles/theme";

export const themeVar = makeVar(light);
export const isLoggedInVar = makeVar(false);
export const feedWritePayloadVar = makeVar(null);
export const tokenVar = makeVar(null);

export const themeFn = async (theme: string) => {
  switch (theme) {
    case "light":
      return light;
    case "dark":
      return dark;
    default:
      return light;
  }
};
export const isLoggedInFn = async (token: string) => {
  await AsyncStorage.setItem(TOKEN, token as string);
  isLoggedInVar(true);
  tokenVar(token as any);
};

export const isLoggedOutFn = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar(null);
};
