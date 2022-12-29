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
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={dismissKeyboard} disabled={Platform.OS === "web"} style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{
            width: "100%",
            flex: 1,
          }}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 0}
        >
          {children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
