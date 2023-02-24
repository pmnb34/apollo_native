import React from "react";
import { Text, View, Image, TouchableWithoutFeedback, ScrollView } from "react-native";
import styled from "styled-components";

export default function SSImageVerticalScroll({ images }) {
  return (
    <Image_Vertical_Scroll>
      <TouchableWithoutFeedback>
        <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback>
            <ScrollBox>
              {images?.map((img, index) => (
                <ImagesBox key={index}>
                  <Images source={{ uri: img.location }} />
                </ImagesBox>
              ))}
            </ScrollBox>
          </TouchableWithoutFeedback>
        </ScrollView>
      </TouchableWithoutFeedback>
    </Image_Vertical_Scroll>
  );
}

const Image_Vertical_Scroll = styled(View)`
  flex: 1;
  margin-top: 12px;
`;
const ImagesBox = styled(View)`
  width: 390px;
  margin-right: 10px;
  border-radius: 10px;
  overflow: hidden;
`;
const Images = styled(Image)`
  width: 100%;
  height: 390px;
`;
const ScrollBox = styled(View)`
  flex-direction: row;
  margin-bottom: 10px;
`;
