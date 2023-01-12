import React from "react";
import { useReactiveVar } from "@apollo/client";
import { View, TextInput, TouchableWithoutFeedback, Platform } from "react-native";
import { writeBody, writeFocusTag, writeFocusMention, writeFocusPosition } from "./WriteStore";
import styled from "styled-components";
import { highlightHashtags } from "./Hooks/highlightTagMention";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";

function TextareaContainer() {
  const { dismiss } = useBottomSheetModal();
  const Body = useReactiveVar(writeBody);

  const changeText = (inputText) => {
    writeBody(inputText);
    highlightHashtags(inputText);
  };

  const keyPress = (e) => {
    if (e.nativeEvent.key === "#") {
      writeFocusTag(true);
    }
    if (e.nativeEvent.key === "@") {
      writeFocusMention(true);
    }
    if (e.nativeEvent.key === " " || e.nativeEvent.key === "Enter") {
      writeFocusTag(false);
      writeFocusMention(false);
      dismiss();
    }
  };

  const onSelectionChange = (e) => {
    const {
      nativeEvent: {
        selection: { start },
      },
    } = e;
    writeFocusPosition(start);
  };

  return (
    <TouchableWithoutFeedback>
      <TopInner>
        <TextInput
          placeholder="무슨 일이 일어나고 있나요?"
          placeholderTextColor={"rgba(128, 131, 255, 0.5)"}
          keyboardType={Platform.OS === "ios" ? "twitter" : "default"}
          multiline={true}
          value={Body}
          onChangeText={changeText}
          onKeyPress={keyPress}
          onSelectionChange={onSelectionChange}
        />
      </TopInner>
    </TouchableWithoutFeedback>
  );
}

export default TextareaContainer;

const TopInner = styled(View)`
  padding-bottom: 10px;
`;
