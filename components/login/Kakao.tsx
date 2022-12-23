import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import styled from "styled-components";
import * as AuthSession from "expo-auth-session";
import { fromPromise, gql, useMutation } from "@apollo/client";
import { isLoggedInFn } from "../../store";
import { getAccToken } from "../../apollo";
import { setTokenTime } from "../../enum";

const KAKAO_LOGIN_MUTATION = gql`
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

function Kakao() {
  const onCompleted = async (data: any) => {
    console.log(data);
    const {
      kakao: { success, id, token, tokenTime },
    } = data;
    if (success) {
      await isLoggedInFn(id, token, setTokenTime(tokenTime) as any, "kakao");
      await getAccToken(id, token, setTokenTime(tokenTime) as any, "kakao");
    }
  };

  const [loginMutation, { loading }] = useMutation(KAKAO_LOGIN_MUTATION, { onCompleted });

  const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize";
  const KAKAO_CONFIG = {
    client_id: process.env.KAKAO_LOGIN_CLIENT_ID,
    redirect_uri: process.env.KAKAO_LOGIN_REDIRECT_URI,
    response_type: "code",
  };
  const KAKAO_AUTH = `${KAKAO_AUTH_URL}?client_id=${KAKAO_CONFIG.client_id}&redirect_uri=${KAKAO_CONFIG.redirect_uri}&response_type=${KAKAO_CONFIG.response_type}`;

  const kakaoLogin = async () => {
    const result = await AuthSession.startAsync({ authUrl: KAKAO_AUTH });
    if (result?.type === "success" && result?.params?.code) {
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
