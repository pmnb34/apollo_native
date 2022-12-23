import React from "react";
import { gql, makeVar, useMutation, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN, TOKEN_TIME, TOKEN_METHOD, USERID } from "./enum";
import { light, dark } from "./styles/theme";
import { getAccToken } from "./apollo";

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

// export const refresh = async (token: string, method: string) => {
// const REFRESH_TOKEN_MUTATION = gql`
//   query RefreshToken($token: String!, $method: String!) {
//     refreshToken(token: $token, method: $method) {
//       message
//       token
//       success
//     }
//   }
// `;
// client
//   .mutate({
//     mutation: REFRESH_TOKEN_MUTATION,
//     variables: { token: "ggggg", method: "kakao" },
//   })
//   .then((result) => {
//     console.log(result);
//   });

// console.log(token);
// console.log(method);
// const REFRESH_TOKEN_MUTATION = gql`
//   query RefreshToken($token: String!, $method: String!) {
//     refreshToken(token: $token, method: $method) {
//       message
//       token
//       success
//     }
//   }
// `;
// const { loading, error, data } = useQuery(REFRESH_TOKEN_MUTATION, {
//   variables: {
//     token,
//     method,
//   },
// });
// console.log(error);
// };
export const setToken = async (id: string, token: string, tokenTime: string, method: string) => {
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
export const removeToken = async () => {
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
export const isLoggedInFn = async (id: string, token: string, tokenTime: string, method: string) => {
  // console.log(method);
  setToken(id, token, String(tokenTime), method);
  // await AsyncStorage.setItem(USERID, id as string);
  // await AsyncStorage.setItem(TOKEN, token as string);
  // await AsyncStorage.setItem(TOKEN_TIME, String(tokenTime));
  // await AsyncStorage.setItem(TOKEN_METHOD, method as string);
  // isLoggedInVar(true);
  // userIdVar(id as any);
  // tokenVar(token as any);
  // tokenTimeVar(String(tokenTime) as any);
  // tokenMethodVar(method as any);
  //셋 타임아웃

  // 로그인시 셋 타임아웃 설정
  // 시간 카운트다운
  // 시간 되면 토큰 리프레시 펑션 작동
  // 다시 셋 타임아웃 세팅
  // 시간 되면 토큰 리프레시 펑션 작동
};

export const isLoggedOutFn = async () => {
  console.log("logout");
  await removeToken();
  // await AsyncStorage.removeItem(USERID);
  // await AsyncStorage.removeItem(TOKEN);
  // await AsyncStorage.removeItem(TOKEN_TIME);
  // await AsyncStorage.removeItem(TOKEN_METHOD);
  // isLoggedInVar(false);
  // userIdVar(null);
  // tokenVar(null);
  // tokenTimeVar(null);
  // tokenMethodVar(null);
};
