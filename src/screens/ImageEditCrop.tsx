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
import { writeImagesEdit, writeImagesPrev } from "../components/Write/WriteStore";
import { useReactiveVar } from "@apollo/client";

function ImageEditCrop({ route }) {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const preSelectImage = useReactiveVar(writeImagesPrev);
  console.log(preSelectImage);
  const fileWidth = route.params.file.width;
  const fileHeight = route.params.file.height;
  useEffect(() => {
    if (preSelectImage?.findIndex((item) => item.id === route.params.file.id) < 0) {
      writeImagesPrev([...(preSelectImage ? preSelectImage : []), route.params.file]);
    }
  }, [route]);

  const ImageBoxWidth = 100;
  const ImageBoxHeight = 300;
  const ratio = fileHeight / fileWidth; // ratio < 0 세로, ratio > 0 가로
  // const imageHeight = ratio * (width - ImageBoxWidth);
  // const imageWidth = (height - ImageBoxHeight) / ratio;
  const imageHeight = ratio > 2 ? height - ImageBoxHeight : ratio * (width - ImageBoxWidth);
  const imageWidth = ratio > 2 ? (height - ImageBoxHeight) / ratio : width - ImageBoxWidth;
  const multiple = fileWidth / (width - ImageBoxWidth);
  const imageCrop = async () => {
    const manipResult = await manipulateAsync(
      route.params.file.uri,
      [
        {
          crop: {
            originX: (offset.value.x - ImageBoxWidth / 2) * multiple,
            originY: (offset.value.y - startY) * multiple,
            width: offset.value.width * multiple,
            height: offset.value.height * multiple,
          },
        },
      ],
      { compress: 1 }
    );
    navigation.navigate("ImageSelect", {
      file: manipResult,
      edit: true,
      editId: route.params.file.id,
    });
  };

  const startY = height / 2 - imageHeight / 2;
  const startX = width / 2 - imageWidth / 2;
  const maxHeight = imageHeight;
  const maxWidth = imageWidth;
  const start = useSharedValue({
    x: startX,
    y: startY,
    width: maxWidth,
    height: maxHeight,
  });

  const offset = useSharedValue({
    x: startX,
    y: startY,
    width: maxWidth,
    height: maxHeight,
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      borderLeftWidth: offset.value.x,
      borderRightWidth: width - offset.value.width,
      borderTopWidth: offset.value.y,
      borderBottomWidth: imageHeight - offset.value.height,
    };
  });
  const animatedSize = useAnimatedStyle(() => {
    return {
      top: offset.value.y,
      left: offset.value.x,
      width: offset.value.width,
      height: offset.value.height,
    };
  });
  const leftTop = Gesture.Pan()
    .onUpdate((e) => {
      console.log(Math.min(maxWidth - ImageBoxWidth / 2, Math.max(startX, start.value.x + e.translationX)));
      const x = Math.min(maxWidth - ImageBoxWidth / 2, Math.max(startX, start.value.x + e.translationX));
      const y = Math.min(startY + maxHeight - ImageBoxWidth, Math.max(startY, start.value.y + e.translationY));
      offset.value = {
        x: x,
        y: y,
        width: Math.min(
          maxWidth,
          Math.max(
            start.value.width - e.translationX < ImageBoxWidth ? ImageBoxWidth : start.value.width - e.translationX,
            e.translationX < 0 ? start.value.width : start.value.width - e.translationX
          )
        ),
        height: Math.min(
          maxHeight,
          Math.max(
            start.value.height - e.translationY < ImageBoxWidth ? ImageBoxWidth : start.value.height - e.translationY,
            e.translationY < 0 ? start.value.height : start.value.height - e.translationY
          )
        ),
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
        width: offset.value.width,
        height: offset.value.height,
      };
    });
  const leftBottom = Gesture.Pan()
    .onUpdate((e) => {
      const x = Math.min(maxWidth - ImageBoxWidth / 2, Math.max(startX, start.value.x + e.translationX));
      const y = Math.min(startY + maxHeight - ImageBoxWidth, Math.max(startY, start.value.y));
      offset.value = {
        x: x,
        y: y,
        width: Math.min(
          maxWidth,
          Math.max(
            start.value.width - e.translationX < ImageBoxWidth ? ImageBoxWidth : start.value.width - e.translationX,
            e.translationX < 0 ? start.value.width : start.value.width - e.translationX
          )
        ),
        height: Math.min(
          maxHeight - (y - startY),
          Math.max(
            start.value.height + e.translationY < ImageBoxWidth ? ImageBoxWidth : start.value.height + e.translationY,
            e.translationY > 0 ? start.value.height : start.value.height + e.translationY
          )
        ),
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
        width: offset.value.width,
        height: offset.value.height,
      };
    });

  const rightBottom = Gesture.Pan()
    .onUpdate((e) => {
      const x = Math.min(maxWidth, Math.max(startX, start.value.x));
      const y = Math.min(startY + maxHeight - ImageBoxWidth, Math.max(startY, start.value.y));
      offset.value = {
        x: x,
        y: y,
        width: Math.min(
          maxWidth - (x - startX),
          Math.max(startX + ImageBoxWidth / 2, start.value.width + e.translationX)
        ),
        height: Math.min(
          maxHeight - (y - startY),
          Math.max(
            start.value.height + e.translationY < ImageBoxWidth ? ImageBoxWidth : start.value.height + e.translationY,
            e.translationY > 0 ? start.value.height : start.value.height + e.translationY
          )
        ),
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
        width: offset.value.width,
        height: offset.value.height,
      };
    });
  const rightTop = Gesture.Pan()

    .onUpdate((e) => {
      const x = Math.min(maxWidth, Math.max(startX, start.value.x));
      const y = Math.min(startY + maxHeight - ImageBoxWidth, Math.max(startY, start.value.y + e.translationY));
      offset.value = {
        x: x,
        y: y,
        width: Math.min(
          maxWidth - (x - startX),
          Math.max(
            start.value.width + e.translationX < ImageBoxWidth ? ImageBoxWidth : start.value.width + e.translationX,
            e.translationX > 0 ? start.value.width : start.value.width + e.translationX
          )
        ),
        height: Math.min(
          maxHeight,
          Math.max(
            start.value.height - e.translationY < ImageBoxWidth ? ImageBoxWidth : start.value.height - e.translationY,
            e.translationY < 0 ? start.value.height : start.value.height - e.translationY
          )
        ),
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
        width: offset.value.width,
        height: offset.value.height,
      };
    });

  const renderImage = () => {
    return (
      <>
        <ImageWrap>
          <Image
            source={{ uri: route.params.file.uri }}
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
          />
        </ImageWrap>
        <View style={{ top: 0, left: 0, position: "absolute" }}>
          <View
            style={[
              {
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
              },
            ]}
          >
            <Animated.View
              style={[
                {
                  borderLeftColor: "rgba(0, 0, 0, .6)",
                  borderRightColor: "rgba(0, 0, 0, .6)",
                  borderTopColor: "rgba(0, 0, 0, .6)",
                  borderBottomColor: "rgba(0, 0, 0, .6)",
                },
                animatedStyles,
              ]}
            >
              <Animated.View
                style={[
                  {
                    backgroundColor: "transparent",
                  },
                  animatedSize,
                ]}
              />

              <GestureDetector gesture={leftTop}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderTopWidth: 2,
                    borderLeftWidth: 2,
                    position: "absolute",
                    left: -2,
                    top: -2,
                    borderLeftColor: "white",
                    borderTopColor: "white",
                  }}
                />
              </GestureDetector>
              <GestureDetector gesture={rightTop}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderTopWidth: 2,
                    borderRightWidth: 2,
                    position: "absolute",
                    right: -2,
                    top: -2,
                    borderRightColor: "white",
                    borderTopColor: "white",
                  }}
                />
              </GestureDetector>

              <GestureDetector gesture={leftBottom}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderBottomWidth: 2,
                    borderLeftWidth: 2,
                    position: "absolute",
                    left: -2,
                    bottom: -2,
                    borderLeftColor: "white",
                    borderBottomColor: "white",
                  }}
                />
              </GestureDetector>
              <GestureDetector gesture={rightBottom}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderBottomWidth: 2,
                    borderRightWidth: 2,
                    position: "absolute",
                    right: -2,
                    bottom: -2,
                    borderRightColor: "white",
                    borderBottomColor: "white",
                  }}
                />
              </GestureDetector>
            </Animated.View>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <Container>
        <Top>{renderImage()}</Top>
        <Bottom>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ImageSelect", {
                file: route.params.file,
              })
            }
          >
            <BottomIcon name="x" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ color: "white" }}>자르기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={imageCrop}>
            <BottomIcon name="check" size={24} color="white" />
          </TouchableOpacity>
        </Bottom>
      </Container>
    </>
  );
}

export default ImageEditCrop;

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
