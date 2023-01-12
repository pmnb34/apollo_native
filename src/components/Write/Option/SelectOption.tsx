import React, { useMemo, useRef, useCallback } from "react";
import { Feather } from "@expo/vector-icons";
import { Text } from "react-native";
import styled from "styled-components";
import { BottomSheetModal, BottomSheetBackdrop, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { writeIsPrivate } from "../WriteStore";
function SelectContainer() {
  const { dismiss } = useBottomSheetModal();

  const snapPoints = useMemo(() => ["60%"], []);
  const selectRef = useRef();
  const select = useCallback(() => {
    selectRef.current?.present();
  }, []);
  const backdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );
  const selectPrivate = (isPrivate) => {
    writeIsPrivate(isPrivate);
    dismiss();
  };

  return (
    <>
      <BottomIcon name="unlock" size={24} color="black" onPress={select} />

      <BottomSheetModal ref={selectRef} index={0} snapPoints={snapPoints} backdropComponent={backdrop}>
        <Text onPress={(e) => selectPrivate(false)}>전체공개 선택</Text>
        <Text onPress={(e) => selectPrivate(true)}>나만보기 선택</Text>
      </BottomSheetModal>
    </>
  );
}

export default SelectContainer;

const BottomIcon = styled(Feather)`
  margin-right: 20px;
`;
