import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
} from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import styled from "styled-components";
import Constants from "expo-constants";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { useNavigation } from "@react-navigation/native";

function ImageEditRotate({ route }) {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const boxRef = useRef();

  const [image, setImage] = useState();
  const [rotate, setRotate] = useState(90);

  const ImageBoxWidth = 100;
  const ratio = route.params.file.height / route.params.file.width; // ratio < 0 세로, ratio > 0 가로
  const imageHeight = ratio * (width - ImageBoxWidth);

  const imageRightRotate = async () => {
    const manipResult = await manipulateAsync(route.params.file.uri, [{ rotate: rotate }], { compress: 1 });
    setImage(manipResult.uri);
    setRotate(rotate + 90);
  };
  const imageLeftRotate = async () => {
    const manipResult = await manipulateAsync(route.params.file.uri, [{ rotate: rotate }], { compress: 1 });
    setImage(manipResult.uri);
    setRotate(rotate - 90);
  };
  const imageCrop = async () => {
    const manipResult = await manipulateAsync(route.params.file.uri, [{ rotate: rotate }], { compress: 1 });
    setImage(manipResult.uri);
    setRotate(90);
    // navigation.navigate("ImageSelect", {
    //   edit: manipResult,
    // });
  };

  const renderImage = () => {
    return (
      <>
        <ImageWrap>
          <Image
            ref={boxRef}
            source={{ uri: image ? image : route.params.file.uri }}
            style={{
              width: width - ImageBoxWidth,
              height: imageHeight,
            }}
          />
        </ImageWrap>
      </>
    );
  };

  return (
    <>
      <Container>
        <Top>{renderImage()}</Top>
        <Bottom>
          <TouchableOpacity onPress={imageLeftRotate}>
            <BottomIcon name="x" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ color: "white" }}>회전</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={imageRightRotate}>
            <BottomIcon name="check" size={24} color="white" />
          </TouchableOpacity>
        </Bottom>
      </Container>
    </>
  );
}

export default ImageEditRotate;

const Box = styled(View)`
  width: 100%;
  background-color: red;
  border: 2px solid blue;
`;
const Container = styled(View)`
  flex: 1;
  justify-content: space-between;
  background-color: #000;
`;
const Top = styled(View)`
  flex: 1;
`;
const ImageWrap = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Bottom = styled(View)`
  width: 100%;
  height: 100px;
  position: absolute;
  bottom: 0;
  /* padding: 40px; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const BottomIcon = styled(Feather)`
  margin-right: 20px;
`;
