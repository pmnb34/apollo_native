import React from "react";
import { Text, View, Image } from "react-native";
import styled from "styled-components";

export default function SSTagList() {
  return (
    <Tag_List>
      <Tag>
        <Tag_Text>#Tag</Tag_Text>
      </Tag>
      <Tag>
        <Tag_Text>#Tag</Tag_Text>
      </Tag>
      <Tag>
        <Tag_Text>#Tag</Tag_Text>
      </Tag>
      <Tag>
        <Tag_Text>#Tag</Tag_Text>
      </Tag>
      <Tag>
        <Tag_Text>#Tag</Tag_Text>
      </Tag>
      <Tag>
        <Tag_Text>#Tag</Tag_Text>
      </Tag>
    </Tag_List>
  );
}
const Tag_List = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;
const Tag = styled(View)`
  border: 1px solid #5455ec;
  padding: 4px 16px;
  border-radius: 50px;
  margin-right: 6px;
  margin-bottom: 6px;
  /* &:last-child {
    margin-right: 0;
  } */
`;
const Tag_Text = styled(Text)`
  color: #5455ec;
  font-size: 10px;
`;
