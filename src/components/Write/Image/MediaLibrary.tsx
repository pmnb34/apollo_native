import React, { useState, useEffect } from "react";
import { FlatList, Text, Image, TouchableWithoutFeedback, View } from "react-native";
import styled from "styled-components";
import * as MediaLibrary from "expo-media-library";
import ImageContainer from "./Image";
import IconContainer from "./Icon";

function MediaLibraryContainer() {
  const [mediaLibrary, setMediaLibrary] = useState([]);

  const getMediaLibrary = async () => {
    const { assets: images } = await MediaLibrary.getAssetsAsync({
      first: 10,
      sortBy: ["creationTime"],
      mediaType: [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video],
    });
    setMediaLibrary(images);
  };

  const getPermissions = async () => {
    const { accessPrivileges, canAskAgain } = await MediaLibrary.getPermissionsAsync();
    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        getMediaLibrary();
      }
    } else if (accessPrivileges !== "none") {
      getMediaLibrary();
    }
  };
  useEffect(() => {
    getPermissions();
  }, []);

  const renderItem = ({ item: image }) => (
    <View>
      <ImageContainer image={image} />
      <IconContainer image={image} />
    </View>
  );

  return <FlatList data={mediaLibrary} numColumns={3} keyExtractor={(image) => image.id} renderItem={renderItem} />;
}

export default MediaLibraryContainer;
