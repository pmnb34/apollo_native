import { useReactiveVar } from "@apollo/client";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Image, ScrollView, useWindowDimensions, TouchableOpacity } from "react-native";
import styled from "styled-components";
import EditMenuContainer from "../components/Write/Image/EditMenu";
import { writeImagesEdit } from "../components/Write/WriteStore";

function ImageSelect({ route }) {
  const { width, height } = useWindowDimensions();
  const editImage = useReactiveVar(writeImagesEdit);
  const [selectFile, setSelectFile] = useState(route.params.file);
  const fileWidth = selectFile.width;
  const fileHeight = selectFile.height;
  useEffect(() => {
    const fit = editImage?.filter((item) => item.id === route.params.file.id);
    if (fit.length > 0) {
      setSelectFile(fit[0]);
    } else {
      setSelectFile(route.params.file);
    }
  }, [route]);

  const ImageBoxWidth = 100;
  const ImageBoxHeight = 300;
  const ratio = fileHeight / fileWidth; // ratio < 0 세로, ratio > 0 가로
  const imageHeight = ratio > 2 ? height - ImageBoxHeight : ratio * (width - ImageBoxWidth);
  const imageWidth = ratio > 2 ? (height - ImageBoxHeight) / ratio : width - ImageBoxWidth;
  return (
    <>
      <Container>
        <Top>
          <Image
            source={{ uri: selectFile.uri }}
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
          />
        </Top>
        <Bottom>
          <EditMenuContainer
            file={selectFile}
            edit={route.params.edit ? route.params.edit : null}
            editId={route.params.editId ? route.params.editId : null}
          />
        </Bottom>
      </Container>
    </>
  );
}

export default ImageSelect;

const Container = styled(View)`
  flex: 1;
  justify-content: space-between;
  background-color: #000;
`;
const Top = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Bottom = styled(View)`
  width: 100%;
  padding: 40px;
`;
