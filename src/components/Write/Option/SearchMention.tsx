import React, { useMemo, useRef, useCallback } from "react";
import { Feather } from "@expo/vector-icons";
import { Text } from "react-native";
import styled from "styled-components";
import { BottomSheetModal, BottomSheetBackdrop, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useReactiveVar } from "@apollo/client";
import { highlightHashtags } from "../Hooks/highlightTagMention";

import { writeBody, writeFocusMention, writeFocusPosition } from "../WriteStore";
import { selectTagMentionBySheet } from "../Hooks/selectTagMentionBySheet";

function SearchMentionContainer() {
  const { dismiss } = useBottomSheetModal();
  const focusMention = useReactiveVar(writeFocusMention);
  const focusPosition = useReactiveVar(writeFocusPosition);
  const Body = useReactiveVar(writeBody);

  //   const selectTagMentionBySheet = (e, type) => {
  //     const newHashtag = focusTagMention
  //       ? e._dispatchInstances.memoizedProps.children
  //       : type + e._dispatchInstances.memoizedProps.children;
  //     const newValue = Body.substring(0, focusPosition) + newHashtag + Body.substring(focusPosition) + " ";
  //     writeBody(newValue);
  //     highlightHashtags(newValue);
  //     writeFocusPosition(focusPosition + newHashtag.length);
  //     writeFocusMention(false);
  //     dismiss();
  //   };

  const select = (e, type) => {
    selectTagMentionBySheet(e, type, focusMention, focusPosition, Body);
    dismiss();
  };

  return (
    <>
      <Text onPress={(e) => select(e, `@`)}>유저</Text>
      <Text onPress={(e) => select(e, `@`)}>다양한유저</Text>
      <Text onPress={(e) => select(e, `@`)}>다른유저</Text>
      <Text onPress={(e) => select(e, `@`)}>이것도</Text>
    </>
  );
}

export default SearchMentionContainer;

const BottomIcon = styled(Feather)`
  margin-right: 20px;
`;
