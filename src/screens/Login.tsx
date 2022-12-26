import React from "react";
import DismissKeyboard from "../components/DismissKeyboard";
import Auth from "../components/login/Auth";
import BottomSheetContainer from "../components/BottomSheetContainer";

function Login() {
  return (
    <BottomSheetContainer>
      <Auth />
    </BottomSheetContainer>
  );
}

export default Login;
