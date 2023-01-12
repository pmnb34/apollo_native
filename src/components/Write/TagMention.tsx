import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components";

function TagMentionContainer({ type, data }) {
  return (
    <TouchableWithoutFeedback>
      <TagMention>
        {data?.map((item, i) => {
          return (
            <ItemWrap key={i} type={type}>
              <Item>{item}</Item>
            </ItemWrap>
          );
        })}
      </TagMention>
    </TouchableWithoutFeedback>
  );
}

export default TagMentionContainer;

const TagMention = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
`;
const ItemWrap = styled(View)`
  background: ${({ type }) => (type === "tag" ? "blue" : "#444")};
  border-radius: 50px;
  overflow: hidden;
  margin-right: 4px;
  margin-bottom: 4px;
`;
const Item = styled(Text)`
  color: #fff;
  padding: 6px 12px;
`;
