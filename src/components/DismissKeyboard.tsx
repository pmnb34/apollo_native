import React from "react";
import { View, Keyboard, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, SafeAreaView } from "react-native";
import styled from "styled-components";

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.bgColor};
`;

export default function DismissKeyboard({ children }: any) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} disabled={Platform.OS === "web"}>
      <KeyboardAvoidingView
        style={{
          width: "100%",
        }}
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
      >
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
