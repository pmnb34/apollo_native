import React, { useRef, useEffect, useCallback } from "react";
import { gql, OperationVariables, useMutation } from "@apollo/client";
import { Text, View, ScrollView, TextInput, Button, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { BottomSheetTextInput, useBottomSheetModal } from "@gorhom/bottom-sheet";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { isLoggedInFn } from "../../store";
import { setTokenTime } from "../../enum";

const CREATEACCOUNT_MUTATION = gql`
  mutation CreateAccount($username: String!, $email: String!, $password: String!) {
    createAccount(username: $username, email: $email, password: $password) {
      message
      success
      id
      token
      tokenTime
    }
  }
`;
function Register(props: any) {
  const { dismiss, dismissAll } = useBottomSheetModal();
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      password_confirm: "",
      username: "",
    },
  });
  const onCompleted = async (data: {
    createAccount: { success: any; message: any; id: any; token: any; tokenTime: any };
  }) => {
    const {
      createAccount: { success, message, id, token, tokenTime },
    } = data;
    if (success) {
      await isLoggedInFn(id, token, setTokenTime(tokenTime), "email");
      Toast.show({
        type: "success",
        topOffset: 80,
        text1: message,
      });
      dismiss();
    }
  };
  const [loginMutation, { loading }] = useMutation(CREATEACCOUNT_MUTATION, { onCompleted });

  const onNext = (nextOne: React.MutableRefObject<any>) => {
    nextOne?.current?.focus();
  };

  const passwordRef = useRef();
  const password_confirmRef = useRef();
  const usernameRef = useRef();

  const onValid = (data: OperationVariables) => {
    if (!loading) {
      loginMutation({
        variables: {
          ...data,
        },
      });
    }
    reset();
  };

  return (
    <Container>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, onBlur } }) => (
          <>
            <InputTitleRow>
              <InputTitle>?????????</InputTitle>
              {errors?.email && <Error>{errors?.email?.message}</Error>}
            </InputTitleRow>
            <Input
              onBlur={onBlur}
              value={value}
              defaultValue={""}
              placeholder="???????????? ??????????????????."
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
            message: "???????????? ??????????????????!",
          },
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            message: "????????? ????????? ??????????????????.",
          },
        }}
      />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value, onBlur } }) => (
          <>
            <InputTitleRow>
              <InputTitle>????????????</InputTitle>
              {errors?.password && <Error>{errors?.password?.message}</Error>}
            </InputTitleRow>
            <Input
              ref={passwordRef}
              onBlur={onBlur}
              value={value}
              defaultValue={""}
              placeholder="??????????????? ??????????????????."
              placeholderTextColor={"rgba(128, 131, 255, 0.5)"}
              onSubmitEditing={() => onNext(password_confirmRef)}
              onChangeText={onChange}
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="next"
            />
          </>
        )}
        rules={{
          required: {
            value: true,
            message: "??????????????? ??????????????????!",
          },
        }}
      />
      <Controller
        control={control}
        name="password_confirm"
        render={({ field: { onChange, value, onBlur } }) => (
          <>
            <InputTitleRow>
              <InputTitle>???????????? ??????</InputTitle>
              {errors?.password_confirm && <Error>{errors?.password_confirm?.message}</Error>}
            </InputTitleRow>
            <Input
              ref={password_confirmRef}
              onBlur={onBlur}
              value={value}
              defaultValue={""}
              placeholder="??????????????? ??????????????????."
              placeholderTextColor={"rgba(128, 131, 255, 0.5)"}
              onSubmitEditing={() => onNext(usernameRef)}
              onChangeText={onChange}
              secureTextEntry
              autoCapitalize="none"
              returnKeyType="next"
            />
          </>
        )}
        rules={{
          required: {
            value: true,
            message: "??????????????? ??????????????????!",
          },
          validate: (value) => value === getValues("password") || "??????????????? ??????????????????!",
        }}
      />
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value, onBlur } }) => (
          <>
            <InputTitleRow>
              <InputTitle>?????????</InputTitle>
              {errors?.username && <Error>{errors?.username?.message}</Error>}
            </InputTitleRow>
            <Input
              ref={usernameRef}
              onBlur={onBlur}
              value={value}
              defaultValue={""}
              placeholder="?????? ???????????? ??????????????????."
              placeholderTextColor={"rgba(128, 131, 255, 0.5)"}
              onSubmitEditing={handleSubmit(onValid)}
              onChangeText={onChange}
              autoCapitalize="none"
              returnKeyType="done"
            />
          </>
        )}
        rules={{
          required: {
            value: true,
            message: "?????? ???????????? ??????????????????!",
          },
        }}
      />
      <Btn onPress={handleSubmit(onValid)}>
        {loading ? <ActivityIndicator color="white" /> : <BtnText>???????????? ????????????</BtnText>}
      </Btn>
    </Container>
  );
}

export default Register;

const Container = styled(ScrollView)`
  /* align-items: center; */
  /* justify-content: center; */
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
  margin-bottom: 50px;
`;
const BtnText = styled(Text)`
  text-align: center;
  justify-content: center;
  align-items: center;
  color: ${({ line, theme }) => (line ? theme.btn.btnFontColor_line : theme.whiteColor)};
`;
