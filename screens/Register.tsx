import React, { useRef, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";

const CREATEACCOUNT_MUTATION = gql`
  mutation CreateAccount($name: String!, $username: String!, $email: String!, $password: String!) {
    createAccount(name: $name, username: $username, email: $email, password: $password) {
      success
      message
    }
  }
`;
function Register() {
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
  const onCompleted = (data) => {
    console.log(data);
  };
  const [createAccountMutation, { loading }] = useMutation(CREATEACCOUNT_MUTATION, { onCompleted });

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const passwordRef = useRef();
  const password_confirmRef = useRef();
  const usernameRef = useRef();

  const onValid = (data) => {
    console.log(data);
    if (!loading) {
      createAccountMutation({
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
    register("password_confirm", {
      required: "비밀번호를 입력해주세요.",
      validate: (val) => {
        if (watch("password") != val) {
          return "비밀번호를 확인해주세요.";
        }
      },
    });
    register("username", {
      required: "닉네임을 입력해주세요.",
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
          returnKeyType="next"
          onSubmitEditing={() => onNext(password_confirmRef)}
          placeholderTextColor={"red"}
          onChangeText={(text) => setValue("password", text)}
        />
        {errors.password && <Text style={{ color: "red" }}>{errors.password.message}</Text>}
        <TextInput
          ref={password_confirmRef}
          placeholder="password confirm"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => onNext(usernameRef)}
          placeholderTextColor={"red"}
          onChangeText={(text) => setValue("password_confirm", text)}
        />
        {errors.password_confirm && <Text style={{ color: "red" }}>{errors.password_confirm.message}</Text>}
        <TextInput
          ref={usernameRef}
          placeholder="username"
          autoCapitalize="none"
          returnKeyType="done"
          onSubmitEditing={handleSubmit(onValid)}
          placeholderTextColor={"red"}
          onChangeText={(text) => setValue("username", text)}
        />
        {errors.username && <Text style={{ color: "red" }}>{errors.username.message}</Text>}
        <Button title="Submit" onPress={handleSubmit(onValid)} />
      </View>
    </>
  );
}

export default Register;
