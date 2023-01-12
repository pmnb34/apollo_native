import { Feather } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { manipulateAsync } from "expo-image-manipulator";
import { writeImages, writeImagesPrev, writeImagesEdit } from "../WriteStore";
import { useReactiveVar } from "@apollo/client";

function EditMenuContainer({ file, edit, editId }) {
  const navigation = useNavigation();
  const preSelectImage = useReactiveVar(writeImagesPrev);
  //   const [rotate, setRotate] = useState(90);
  //   const selectedFile = image ? image : file;
  //   const imageRightRotate = async () => {
  //     const manipResult = await manipulateAsync(selectedFile.uri, [{ rotate: rotate }], { compress: 1 });
  //     setImage(manipResult.uri);
  //     setRotate(rotate + 90);
  //   };
  if (edit) {
    Image.getSize(file.uri, (width, height) => {
      if (preSelectImage?.findIndex((item) => item.id === editId) > -1) {
        const index = preSelectImage?.findIndex((item) => item.id === editId);
        console.log(index);
        if (!preSelectImage[index].originalUri) {
          preSelectImage[index].originalUri = preSelectImage[index].uri;
        }
        if (!preSelectImage[index].originalWidth) {
          preSelectImage[index].originalWidth = preSelectImage[index].width;
        }
        if (!preSelectImage[index].originalHeight) {
          preSelectImage[index].originalHeight = preSelectImage[index].height;
        }
        preSelectImage[index].uri = file.uri;
        preSelectImage[index].width = file.width;
        preSelectImage[index].height = file.height;
      }
    });
  }

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() => {
        writeImagesPrev(preSelectImage);
        writeImagesEdit(preSelectImage);
        navigation.navigate("ImageList");
      }}
    >
      <AddText>추가</AddText>
    </TouchableOpacity>
  );
  const HeaderLeft = () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ImageList");
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
    <EditMenu>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ImageEditCrop", {
            file: file,
          });
        }}
      >
        <BottomIcon name="crop" size={24} color="white" />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={imageRightRotate}>
        <BottomIcon name="crop" size={24} color="white" />
      </TouchableOpacity> */}
    </EditMenu>
  );
}

export default EditMenuContainer;
const EditMenu = styled(View)`
  flex-direction: row;
`;
const BottomIcon = styled(Feather)`
  margin-right: 20px;
`;
const AddText = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
  color: ${({ theme, disabled }) => (disabled ? "rgba(0,0,0,0.2) " : theme.primary)};
`;
