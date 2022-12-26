import React from "react";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { View } from "react-native";

function BottomSheetContainer({ children }) {
  return <BottomSheetModalProvider style={{ flex: 1 }}>{children}</BottomSheetModalProvider>;
}

export default BottomSheetContainer;
