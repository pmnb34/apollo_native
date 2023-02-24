import React from "react";
import { Text, View, Image } from "react-native";
import styled from "styled-components";

export default function SSMentionList() {
  return (
    <Mention_List>
      <Mention>
        <Mention_Text>@Mention</Mention_Text>
      </Mention>
      <Mention>
        <Mention_Text>@ㄹㄴㅁㅇㄹㄷㅈ</Mention_Text>
      </Mention>
      <Mention>
        <Mention_Text>@cxzveew</Mention_Text>
      </Mention>
      <Mention>
        <Mention_Text>@Mention</Mention_Text>
      </Mention>
    </Mention_List>
  );
}
const Mention_List = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;
const Mention = styled(View)`
  background-color: #5455ec;
  padding: 4px 16px;
  border-radius: 50px;
  margin-right: 6px;
  margin-bottom: 6px;
  /* &:last-child {
    margin-right: 0;
  } */
`;
const Mention_Text = styled(Text)`
  color: #fff;
  font-size: 10px;
`;
