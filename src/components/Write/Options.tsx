import { Feather } from "@expo/vector-icons";
import React, { useMemo, useRef, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { selectImage } from "./Hooks/selectImages";
import SearchTagContainer from "./Option/SearchTag";
import SearchMentionContainer from "./Option/SearchMention";
import SelectContainer from "./Option/SelectOption";
import { BottomSheetModal, BottomSheetBackdrop, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { writeFocusTag, writeFocusMention } from "./WriteStore";
import { useReactiveVar } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
function OptionContainer() {
  const navigation = useNavigation();

  const focusTag = useReactiveVar(writeFocusTag);
  const focusMention = useReactiveVar(writeFocusMention);

  const snapPoints = useMemo(() => ["60%"], []);
  const searchTagRef = useRef();
  const searchMentionRef = useRef();
  const searchTag = useCallback(() => {
    searchTagRef.current?.present();
  }, []);
  const searchMention = useCallback(() => {
    searchMentionRef.current?.present();
  }, []);
  const backdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );
  if (focusTag) {
    searchTag();
  }
  if (focusMention) {
    searchMention();
  }

  return (
    <BottomBottom>
      <BottomIcon name="image" size={24} color="black" onPress={() => navigation.navigate("ImageList")} />
      <BottomIcon name="tag" size={24} color="black" onPress={searchTag} />
      <BottomIcon name="users" size={24} color="black" onPress={searchMention} />
      <BottomSheetModal ref={searchTagRef} index={0} snapPoints={snapPoints} backdropComponent={backdrop}>
        <SearchTagContainer />
      </BottomSheetModal>
      <BottomSheetModal ref={searchMentionRef} index={0} snapPoints={snapPoints} backdropComponent={backdrop}>
        <SearchMentionContainer />
      </BottomSheetModal>
      <SelectContainer />
    </BottomBottom>
  );
}

export default OptionContainer;

const BottomBottom = styled(View)`
  flex-direction: row;

  padding: 14px 20px;
`;
const BottomIcon = styled(Feather)`
  margin-right: 20px;
`;
