import React, { useRef, useMemo, useCallback } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styled from "styled-components";
import LogoImage from "../../components/logo";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import Email from "./Email";
import { useNavigation } from "@react-navigation/native";
import Kakao from "./Kakao";

export default function Auth() {
  const navigation = useNavigation();
  const sheetEmailRef = useRef();
  const sheetEmailRefKakao = useRef();
  const snapPoints = useMemo(() => ["60%"], []);
  const sheetEmail = useCallback(() => {
    sheetEmailRef.current?.present();
  }, []);
  const sheetKako = useCallback(() => {
    sheetEmailRefKakao.current?.present();
  }, []);
  const backdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );
  return (
    <Container>
      <LogoImage />
      <Btn onPress={sheetKako}>
        <BtnText>카카오로 3초만에 시작하기</BtnText>
      </Btn>
      <BottomSheetModal ref={sheetEmailRefKakao} index={0} snapPoints={snapPoints} backdropComponent={backdrop}>
        <Kakao />
      </BottomSheetModal>
      <Btn onPress={() => navigation.navigate("Register")}>
        <BtnText>Apple로 계속하기</BtnText>
      </Btn>
      <Btn line={true} onPress={sheetEmail}>
        <BtnText line={true}>이메일로 로그인</BtnText>
      </Btn>
      <BottomSheetModal ref={sheetEmailRef} index={0} snapPoints={snapPoints} backdropComponent={backdrop}>
        <Email />
      </BottomSheetModal>
    </Container>
  );
}

const Container = styled(View)`
  align-items: center;
  justify-content: space-around;
  padding: 20px 20px;
`;
const Btn = styled(TouchableOpacity)`
  width: 100%;
  height: ${({ line }) => (line ? "20px" : "48px")};
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: ${({ line, theme }) => (line ? "transparent" : theme.btn.btnBgColor)};
  border: 1px solid ${({ line, theme }) => (line ? "transparent" : theme.btn.btnBgColor)};
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  margin-top: 10px;
  border-radius: 50px;
`;
const BtnText = styled(Text)`
  text-align: center;
  justify-content: center;
  align-items: center;
  color: ${({ line, theme }) => (line ? theme.btn.btnFontColor_line : theme.whiteColor)};
`;
