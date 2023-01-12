import React, { useEffect } from "react";
import styled from "styled-components/native";
import { View, Text, TouchableOpacity } from "react-native";

import MediaLibraryContainer from "../components/Write/Image/MediaLibrary";
import { writeImages, writeImagesPrev } from "../components/Write/WriteStore";
import { useReactiveVar } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
function ImageList({ route }) {
  const navigation = useNavigation();
  const SelectImage = useReactiveVar(writeImages);
  const preSelectImage = useReactiveVar(writeImagesPrev);

  const HeaderRight = () =>
    preSelectImage?.length > 0 ? (
      <TouchableOpacity
        onPress={() => {
          console.log(preSelectImage);
          writeImages(preSelectImage);
          navigation.navigate("WriteHome");
        }}
      >
        <AddText>추가</AddText>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity>
        <AddText disabled={true}>추가</AddText>
      </TouchableOpacity>
    );
  const HeaderLeft = () => (
    <TouchableOpacity
      onPress={() => {
        writeImagesPrev(SelectImage);
        navigation.navigate("WriteHome");
      }}
    >
      <AddText>취소</AddText>
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
      headerLeft: HeaderLeft,
    });
  }, [preSelectImage]);

  return (
    <Container>
      <Bottom>
        <MediaLibraryContainer />
      </Bottom>
    </Container>
  );
}

export default ImageList;

const Container = styled(View)`
  flex: 1;
  background-color: black;
`;
const Bottom = styled(View)`
  flex: 1;
  background-color: black;
`;

const AddText = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
  color: ${({ theme, disabled }) => (disabled ? "rgba(0,0,0,0.2) " : theme.primary)};
`;
