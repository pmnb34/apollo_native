import { mutation } from "./apollo";

export const USERID = "userId";
export const TOKEN = "token";
export const TOKEN_TIME = "token_time";
export const TOKEN_METHOD = "token_method";

export const setTokenTime = (tokenTime: string) => {
  return Number(Math.ceil(Date.now() / 1000)) + Number(tokenTime);
};
