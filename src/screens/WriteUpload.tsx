import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import { View, Text, Image, FlatList, StatusBar, TouchableOpacity, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
function WriteUpload() {
  const navigation = useNavigation();

  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState("");
  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync({
      first: 10,
      sortBy: ["creationTime"],
      mediaType: [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video],
    });
    setPhotos(photos);
    setChosenPhoto(photos[0]?.uri);
  };

  const getPermissions = async () => {
    const { accessPrivileges, canAskAgain } = await MediaLibrary.getPermissionsAsync();
    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        setOk(true);
        getPhotos();
      }
    } else if (accessPrivileges !== "none") {
      setOk(true);
      getPhotos();
    }
  };

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("UploadForm", {
          file: chosenPhoto,
        })
      }
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );

  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [chosenPhoto]);
  const { width } = useWindowDimensions();
  const choosePhoto = (photo) => {
    setChosenPhoto(photo.uri);
  };

  const renderItem = ({ item: photo }) => (
    <ImageContainer onPress={() => choosePhoto(photo)}>
      <Image source={{ uri: photo.uri }} style={{ width: width / 4, height: 100 }} />
      <IconContainer>
        <Ionicons name="checkmark-circle" size={18} color={photo.uri === chosenPhoto ? "blue" : "white"} />
      </IconContainer>
    </ImageContainer>
  );

  return (
    <Container>
      {/* <StatusBar hidden={false} /> */}
      <Bottom>
        <FlatList data={photos} numColumns={4} keyExtractor={(photo) => photo.id} renderItem={renderItem} />
      </Bottom>
    </Container>
  );
}

export default WriteUpload;

const Container = styled(View)`
  flex: 1;
  background-color: black;
`;

const Top = styled(View)`
  flex: 1;
  background-color: black;
  align-items: center;
  justify-content: center;
`;

const Bottom = styled(View)`
  flex: 1;
  background-color: black;
`;

const ImageContainer = styled(TouchableOpacity)``;
const IconContainer = styled(View)`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;

const HeaderRightText = styled(Text)`
  color: "blue";
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;
