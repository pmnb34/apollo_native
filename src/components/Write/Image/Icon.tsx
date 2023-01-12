import { useReactiveVar } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { writeImages, writeImagesPrev } from "../WriteStore";

function IconContainer({ image }) {
  const preSelectImage = useReactiveVar(writeImagesPrev);

  const selected = (image) => {
    writeImagesPrev([...(preSelectImage ? preSelectImage : []), image]);
  };
  const unselected = (image) => {
    writeImages(preSelectImage?.filter((item) => item.id !== image.id));
    const resetOriginImage = preSelectImage.map((item) => {
      item.uri = item.originalUri;
      item.width = item.originalWidth;
      item.height = item.originalHeight;
      return item;
    });
    writeImagesPrev(resetOriginImage?.filter((item) => item.id !== image.id));
  };
  const checked = (image) => {
    if (preSelectImage?.length > 0) {
      return preSelectImage?.some((e) => e.id === image.id);
    } else {
      return false;
    }
  };
  const checkedIndex = (image) => {
    if (preSelectImage?.length > 0) {
      return preSelectImage?.findIndex((e) => e.id === image.id) + 1;
    } else {
      return null;
    }
  };

  return (
    <IconBox>
      <CircleIcon
        onPress={() => {
          checked(image) ? unselected(image) : selected(image);
        }}
        checked={checked(image)}
      >
        <CircleIconText checked={() => checked(image)}>{checked(image) ? checkedIndex(image) : null}</CircleIconText>
      </CircleIcon>
    </IconBox>
  );
}

export default IconContainer;

const IconBox = styled(View)`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const CircleIcon = styled(TouchableOpacity)`
  border: 1px solid ${({ theme, checked }) => (checked ? theme.primary : "rgba(0,0,0,0.5)")};
  background-color: ${({ theme, checked }) => (checked ? theme.primary : "rgba(255,255,255,0.6)")};
  width: 30px;
  height: 30px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`;
const CircleIconText = styled(Text)`
  color: ${({ checked }) => (checked ? "#fff" : "rgba(255,255,255,0.6)")};
`;
