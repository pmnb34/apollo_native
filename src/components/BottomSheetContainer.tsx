import React from "react";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

function BottomSheetContainer({ children }: any) {
  return <BottomSheetModalProvider style={{ flex: 1 }}>{children}</BottomSheetModalProvider>;
}

export default BottomSheetContainer;
