import React from "react";
import { View, Text, Image, TouchableOpacity, useWindowDimensions } from "react-native";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";

function ImageContainer({ image }) {
  const navigation = useNavigation();

  const { width } = useWindowDimensions();
  return (
    <ImageBox
      onPress={() =>
        navigation.navigate("ImageSelect", {
          file: image,
        })
      }
    >
      <Image source={{ uri: image.uri }} style={{ width: width / 3, height: width / 3 }} />
    </ImageBox>
  );
}

export default ImageContainer;
const ImageBox = styled(TouchableOpacity)``;
