import { makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN, TOKEN_TIME, TOKEN_METHOD, USERID } from "./enum";
import { light, dark } from "./styles/theme";

export const themeVar = makeVar(light);
export const isLoggedInVar = makeVar(false);
export const feedWritePayloadVar = makeVar(null);

export const userIdVar = makeVar(null);
export const tokenVar = makeVar(null);
export const tokenTimeVar = makeVar(null);
export const tokenMethodVar = makeVar(null);

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
export const setToken = async (
  id: string,
  token: string,
  tokenTime: string | number,
  method: string
): Promise<void> => {
  await AsyncStorage.setItem(USERID, id as string);
  await AsyncStorage.setItem(TOKEN, token as string);
  await AsyncStorage.setItem(TOKEN_TIME, String(tokenTime));
  await AsyncStorage.setItem(TOKEN_METHOD, method as string);
  isLoggedInVar(true);
  userIdVar(id as any);
  tokenVar(token as any);
  tokenTimeVar(String(tokenTime) as any);
  tokenMethodVar(method as any);
};
export const removeToken = async (): Promise<void> => {
  await AsyncStorage.removeItem(USERID);
  await AsyncStorage.removeItem(TOKEN);
  await AsyncStorage.removeItem(TOKEN_TIME);
  await AsyncStorage.removeItem(TOKEN_METHOD);
  isLoggedInVar(false);
  userIdVar(null);
  tokenVar(null);
  tokenTimeVar(null);
  tokenMethodVar(null);
};
export const isLoggedInFn = async (
  id: string,
  token: string,
  tokenTime: string | number,
  method: string
): Promise<void> => {
  await setToken(id, token, String(tokenTime), method);
};

export const isLoggedOutFn = async () => {
  await removeToken();
};
