import React from "react";
import { Feather } from "@expo/vector-icons";
import { ScrollView, View, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { writeImages } from "./WriteStore";
import styled from "styled-components";
import { useReactiveVar } from "@apollo/client";

import { imageDelete, selectImage } from "./Hooks/selectImages";
import { useNavigation } from "@react-navigation/native";

function ImageContainer() {
  const navigation = useNavigation();
  const images = useReactiveVar(writeImages);
  return (
    <TouchableWithoutFeedback>
      <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableWithoutFeedback>
          <ScrollBox>
            {images.length > 0 ? (
              images?.map((image, index) => (
                <ImagesBox key={index}>
                  <ButtonWrap>
                    <TouchableOpacity onPress={(e) => imageDelete(images, image.id)}>
                      <Feather name="x-circle" size={30} color="black" />
                    </TouchableOpacity>
                  </ButtonWrap>
                  <Images source={{ uri: image.uri }} />
                </ImagesBox>
              ))
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate("ImageList")}>
                <Feather name="plus" size={24} color="black" />
              </TouchableOpacity>
            )}
          </ScrollBox>
        </TouchableWithoutFeedback>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

export default ImageContainer;

const ScrollBox = styled(View)`
  flex-direction: row;
  margin-bottom: 10px;
`;
const ImagesBox = styled(View)`
  width: 200px;
  margin-right: 10px;
  border-radius: 10px;
  overflow: hidden;
`;
const Images = styled(Image)`
  width: 100%;
  height: 200px;
`;
const ButtonWrap = styled(View)`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1;
`;
