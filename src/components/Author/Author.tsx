import React from "react";
import { Text, View, Image } from "react-native";
import styled from "styled-components";

export default function SSAuthor({ name, avatar }) {
  return (
    <Author>
      <Author_Left>
        <Author_Avatar>
          <Avatar_Img source={{ uri: avatar }} />
        </Author_Avatar>
        <AuthorLeftInfo>
          <AuthorInfoName>{name}</AuthorInfoName>
          <AuthorInfoHash>@wareware · 1일</AuthorInfoHash>
        </AuthorLeftInfo>
      </Author_Left>
      <Author_Right>
        <Btn_Fill_Primary>
          <Btn_Text_White>팔로우</Btn_Text_White>
        </Btn_Fill_Primary>
      </Author_Right>
    </Author>
  );
}

const Author = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 30px 30px 12px;
`;
const Author_Left = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
const Author_Right = styled(View)``;
const AuthorLeftInfo = styled(View)`
  margin-left: 12px;
`;

const AuthorInfoName = styled(Text)`
  font-size: 14px;
`;
const AuthorInfoHash = styled(Text)`
  font-size: 12px;
  color: 48464C;
  opacity: 0.5;
  margin-top: 4px;
`;
const Btn_Fill_Primary = styled(View)`
  background-color: #5455ec;
  padding: 8px 24px;
  border-radius: 50px;
`;
const Btn_Text_White = styled(Text)`
  color: #fff;
  font-size: 12px;
`;

const Author_Avatar = styled(View)`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  overflow: hidden;
`;
const Avatar_Img = styled(Image)`
  width: 40px;
  height: 40px;
`;
