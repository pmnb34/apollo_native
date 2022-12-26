import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Button, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import DismissKeyboard from "../components/DismissKeyboard";
import * as ImagePicker from "expo-image-picker";
import { feedWritePayloadVar } from "../store";
import { useForm, Controller } from "react-hook-form";
import { useReactiveVar } from "@apollo/client";

function Write() {
  const writeData = useReactiveVar(feedWritePayloadVar);

  const [image, setImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
      feedWritePayloadVar({
        ...writeData,
        images: result.assets[0].uri,
      });
    }
  };

  const onChangeBody = (text: any) => {
    feedWritePayloadVar({
      ...writeData,
      body: text,
    });
  };
  const onChangeTag = (text: any) => {
    feedWritePayloadVar({
      ...writeData,
      tags: text,
    });
  };
  return (
    <DismissKeyboard>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Input onChangeText={onChangeBody} />
      <Input onChangeText={onChangeTag} />
    </DismissKeyboard>
  );
}

export default Write;

const TextArea = styled(TextInput)`
  width: 200px;
  height: 200px;
  border: 1px solid #000;
`;
const TagArea = styled(TextInput)`
  width: 200px;
  height: 50px;
  border: 1px solid #000;
`;

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
  text-align: left;
  padding: 0 20px;
`;

const Input = styled(TextInput)`
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
