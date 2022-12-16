import React, { useRef, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { isLoggedInFn } from "../store";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
      token
    }
  }
`;
function Login({ navigation }) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      password_confirm: "",
    },
  });
  const onCompleted = async (data) => {
    const {
      login: { success, token },
    } = data;
    if (success) {
      await isLoggedInFn(token);
    }
  };
  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, { onCompleted });

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const passwordRef = useRef();
  const password_confirmRef = useRef();

  const onValid = (data) => {
    console.log(data);
    if (!loading) {
      loginMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register("email", {
      required: "이메일을 입력해주세요.",
    });
    register("password", {
      required: "비밀번호를 입력해주세요.",
    });
  }, [register]);

  return (
    <>
      <View>
        <TextInput
          placeholder="email"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => onNext(passwordRef)}
          placeholderTextColor={"red"}
          onChangeText={(text) => setValue("email", text)}
        />
        {errors.email && <Text style={{ color: "red" }}>{errors.email.message}</Text>}
        <TextInput
          ref={passwordRef}
          placeholder="password"
          autoCapitalize="none"
          returnKeyType="done"
          onSubmitEditing={handleSubmit(onValid)}
          placeholderTextColor={"red"}
          onChangeText={(text) => setValue("password", text)}
        />
        {errors.password && <Text style={{ color: "red" }}>{errors.password.message}</Text>}
        <Button title="Submit" onPress={handleSubmit(onValid)} />
        <Button title="Go to Register" onPress={() => navigation.navigate("Register")} />
      </View>
    </>
  );
}

export default Login;
