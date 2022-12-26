import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import * as AuthSession from "expo-auth-session";
import { useMutation } from "@apollo/client";
import { isLoggedInFn } from "../../store";
import { getAccToken } from "../../apollo";
import { setTokenTime } from "../../enum";
import { KAKAO_AUTH, KAKAO_LOGIN_MUTATION } from "../gql/login";

function Kakao() {
  const [login] = useMutation(KAKAO_LOGIN_MUTATION, {
    onCompleted: async (data) => {
      const {
        kakao: { success, id, token, tokenTime },
      } = data;
      if (success) {
        await isLoggedInFn(id, token, setTokenTime(tokenTime), "kakao");
        await getAccToken(setTokenTime(tokenTime));
      }
    },
  });
  const KAKAO_LOGIN = async () => {
    const result = await AuthSession.startAsync({ authUrl: KAKAO_AUTH });
    if (result?.type === "success" && result?.params?.code) {
      const { code } = result.params;
      login({
        variables: { token: code },
      });
    }
  };

  return (
    <Btn onPress={KAKAO_LOGIN}>
      <BtnText>카카오로 3초만에 시작하기</BtnText>
    </Btn>
  );
}
export default Kakao;

const Btn = styled(TouchableOpacity)`
  width: 100%;
  height: ${({ line }) => (line ? "20px" : "48px")};
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: ${({ line, theme }) => (line ? "transparent" : theme.kakaoBg)};
  border: 1px solid ${({ line, theme }) => (line ? "transparent" : theme.kakaoBg)};
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  margin-top: 10px;
  border-radius: 50px;
`;
const BtnText = styled(Text)`
  text-align: center;
  justify-content: center;
  align-items: center;
  color: ${({ line, theme }) => (line ? theme.kakaoFont : theme.kakaoFont)};
`;
