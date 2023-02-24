import React, { useState, useEffect } from "react";
import { FlatList, Text, Image, TouchableWithoutFeedback, View } from "react-native";
import styled from "styled-components";
import * as MediaLibrary from "expo-media-library";
import ImageContainer from "./Image";
import IconContainer from "./Icon";

function MediaLibraryContainer() {
  const [page, setPage] = useState(0);
  const [lastItemID, setlastItemID] = useState(undefined);

  const [mediaLibrary, setMediaLibrary] = useState([]);
  const getMediaLibrary = async () => {
    const pageSize = 100;
    const { endCursor, assets: images } = await MediaLibrary.getAssetsAsync({
      after: lastItemID,
      first: pageSize,
      sortBy: ["creationTime"],
      mediaType: [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video],
    });
    setlastItemID(endCursor);
    setMediaLibrary((oldArray) => [...oldArray, ...images]);
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

  return (
    <FlatList
      data={mediaLibrary}
      numColumns={3}
      keyExtractor={(image) => image.id}
      disableVirtualization={true}
      renderItem={renderItem}
      onEndReached={getMediaLibrary}
      onEndReachedThreshold={3}
    />
  );
}

export default MediaLibraryContainer;
