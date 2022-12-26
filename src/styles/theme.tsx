const color = {
  primary: "#8083FF",
  primaryDisabled: "rgba(128,131,255,0.5)",

  active: "#2F3135",
  error: "#ea4746",

  white: "#fff",
  gray: "#727272",
  dark: "#121212",

  body: "#707070",
  bg: "#f5f5f9",

  kakaoBg: "#FEE500",
  kakaoSimbol: "#000",
  kakaoFont: "rgba(0,0,0,0.8)",
};

const commonStyle = {
  pointColor: color.primary,
  pointDisabled: color.primaryDisabled,
  errorColor: color.error,
  activateColor: color.active,
  grayColor: color.gray,
  whiteColor: color.white,
  kakaoBgColor: color.kakaoBg,
  font: {
    headingBold: "font-weight: 700; font-size: 4.8rem;",
    subTitleBold: "font-weight: 700; font-size: 3.6rem;",
    subTitleRegular: "font-weight: 400; font-size: 3.6rem;",
    bodyRegular: "font-weight: 400; font-size: 1.2rem;",
  },
  btn: {
    btnFontColor: color.white,
    btnBgColor: color.primary,
    btnFontColor_line: color.primary,
    btnBgColor_Line: "transparent",
  },
  input: {
    inputFontColor: color.body,
    inputBorderColor: color.body,
    inputBgColor: color.white,
    inputdisabledBgColor: color.body,
  },
};
export const light = {
  ...color,
  ...commonStyle,
  bgColor: color.bg,
  contentColor: color.body,
  titleColor: color.dark,
};
export const dark = {
  bgColor: color.dark,
  fontPrimary: color.white,
};
