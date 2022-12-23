import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { gql, useMutation } from "@apollo/client";
import { Text, View, TextInput, Image, Button, TouchableOpacity, ActivityIndicator } from "react-native";
import { useForm, Controller, useFormState } from "react-hook-form";
import { isLoggedInFn } from "../../store";
import styled from "styled-components";
import Auth from "frontend/components/login/Auth";
import { BottomSheetModal, BottomSheetTextInput, useBottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import DismissKeyboard from "../DismissKeyboard";
import Register from "./Register";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
      token
    }
  }
`;

function Email({ navigation }) {
  const { dismiss, dismissAll } = useBottomSheetModal();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onCompleted = async (data) => {
    console.log(data);
    const {
      login: { success, token },
    } = data;
    if (success) {
      await isLoggedInFn(token, "email");
    }
  };
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const passwordRef = useRef();

  const onValid = (data) => {
    if (!loading) {
      loginMutation({
        variables: {
          ...data,
        },
      });
    }
    reset();
  };

  // ref
  const bottomSheetModalRef3 = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["90%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    dismiss();
    bottomSheetModalRef3.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  // renders
  const renderBackdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  return (
    <DismissKeyboard>
      <Container>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value, onBlur } }) => (
            <>
              <InputTitleRow>
                <InputTitle>이메일</InputTitle>
                {errors?.email && <Error>{errors?.email?.message}</Error>}
              </InputTitleRow>
              <Input
                onBlur={onBlur}
                value={value}
                defaultValue={""}
                placeholder="이메일을 입력해주세요."
                placeholderTextColor={"rgba(128, 131, 255, 0.5)"}
                onSubmitEditing={() => onNext(passwordRef)}
                onChangeText={onChange}
                returnKeyType="next"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </>
          )}
          rules={{
            required: {
              value: true,
              message: "이메일을 입력해주세요!",
            },
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "이메일 형식을 입력해주세요.",
            },
          }}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value, onBlur } }) => (
            <>
              <InputTitleRow>
                <InputTitle>비밀번호</InputTitle>
                {errors?.password && <Error>{errors?.password.message}</Error>}
              </InputTitleRow>
              <Input
                ref={passwordRef}
                onBlur={onBlur}
                value={value}
                defaultValue={""}
                placeholder="비밀번호를 입력해주세요."
                placeholderTextColor={"rgba(128, 131, 255, 0.5)"}
                onSubmitEditing={handleSubmit(onValid)}
                onChangeText={onChange}
                secureTextEntry
                autoCapitalize="none"
                returnKeyType="done"
              />
            </>
          )}
          rules={{
            required: {
              value: true,
              message: "비밀번호를 입력해주세요!",
            },
          }}
        />

        <Btn onPress={handleSubmit(onValid)}>
          {loading ? <ActivityIndicator color="white" /> : <BtnText>로그인</BtnText>}
        </Btn>
        <Btn line={true} onPress={handlePresentModalPress}>
          <BtnText line={true}>회원가입</BtnText>
        </Btn>
        <BottomSheetModal
          ref={bottomSheetModalRef3}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}
          shouldMeasureContentHeight={true}
        >
          <Register />
        </BottomSheetModal>
      </Container>
    </DismissKeyboard>
  );
}

export default Email;

const Container = styled(View)`
  align-items: center;
  justify-content: center;
  padding: 20px 20px;
`;
const InputTitleRow = styled(View)`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
`;

const InputTitle = styled(Text)`
  color: ${({ theme }) => theme.pointColor};
  align-items: center;
  justify-content: space-between;
  /* width: 50%; */
  text-align: left;
  padding: 0 20px;
`;
const Input = styled(BottomSheetTextInput)`
  width: 100%;
  height: 60px;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.input.inputBgColor};
  border: 1px solid ${({ theme }) => theme.pointColor};
  border-radius: 50px;
  margin-top: 10px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.pointColor};
`;

const Error = styled(Text)`
  color: ${({ theme }) => theme.errorColor};
  text-align: right;
  padding: 0 20px;
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
