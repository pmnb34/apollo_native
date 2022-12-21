import React from "react";
import { View, Button } from "react-native";
import styled from "styled-components";
import * as AuthSession from "expo-auth-session";
import { gql, useMutation } from "@apollo/client";
import { isLoggedInFn } from "../../store";

const KAKAO_LOGIN_MUTATION = gql`
  mutation Kakao($token: String!) {
    kakao(token: $token) {
      message
      success
      token
    }
  }
`;

function Kakao() {
  const onCompleted = async (data: any) => {
    console.log(data);
    const {
      kakao: { success, token },
    } = data;
    if (success) {
      await isLoggedInFn(token);
    }
  };

  const [loginMutation, { loading }] = useMutation(KAKAO_LOGIN_MUTATION, { onCompleted });

  const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize";
  const KAKAO_CONFIG = {
    client_id: "28e6691309c02ad3edcac8320f0204d3",
    redirect_uri: "https://auth.expo.io/@leeseunghwan/frontend",
    response_type: "code",
  };
  const KAKAO_AUTH = `${KAKAO_AUTH_URL}?client_id=${KAKAO_CONFIG.client_id}&redirect_uri=${KAKAO_CONFIG.redirect_uri}&response_type=${KAKAO_CONFIG.response_type}`;

  const kakaoLogin = async () => {
    const result = await AuthSession.startAsync({ authUrl: KAKAO_AUTH });
    if (result.type === "success") {
      const { code } = result.params;
      loginMutation({
        variables: { token: code },
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="login" onPress={kakaoLogin}></Button>
    </View>
  );
}
export default Kakao;

const Container = styled(View)`
  align-items: center;
  justify-content: center;
`;
