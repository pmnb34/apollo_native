import { gql } from "@apollo/client";
import { ENV } from "../../../env";

export const KAKAO_LOGIN_MUTATION = gql`
  mutation Kakao($token: String!) {
    kakao(token: $token) {
      message
      success
      id
      token
      tokenTime
    }
  }
`;

const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize";
const KAKAO_CONFIG = {
  client_id: ENV.KAKAO_LOGIN_CLIENT_ID,
  redirect_uri: ENV.KAKAO_LOGIN_REDIRECT_URI,
  response_type: "code",
};

export const KAKAO_AUTH = `${KAKAO_AUTH_URL}?client_id=${KAKAO_CONFIG.client_id}&redirect_uri=${KAKAO_CONFIG.redirect_uri}&response_type=${KAKAO_CONFIG.response_type}`;
