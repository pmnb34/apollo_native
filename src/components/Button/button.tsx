const BtnContainer = styled(TouchableOpacity)`
  width: 100%;
  height: ${({ line }) => (line ? "20px" : "48px")};
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: ${({ line, theme }) => (line ? "transparent" : theme.kakaoBg)};
  border: 1px solid ${({ line, theme }) => (line ? "transparent" : theme.kakaoBg)};
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  margin-top: 10px;
  border-radius: 50px;
`;
const BtnText = styled(Text)`
  text-align: center;
  justify-content: center;
  align-items: center;
  color: ${({ line, theme }) => (line ? theme.kakaoFont : theme.kakaoFont)};
`;

// interface button {
//   id: string;
// }
const Btn = ({ onPress, title, line }) => {
  return (
    <BtnContainer onPress={onPress} line={line}>
      <BtnText>{title}</BtnText>
    </BtnContainer>
  );
};
export default Btn;
