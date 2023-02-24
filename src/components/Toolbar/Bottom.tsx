import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, View, Image } from "react-native";
import styled from "styled-components";

export default function SSBottomToolbar() {
  return (
    <Bottom_Toolbar>
    <Bottom_Toolbar_Left>
      <Toolbar_asset>
        <Toolbar_Icon name="message-square" />
        <Toolbar_name>5126</Toolbar_name>
      </Toolbar_asset>
      <Toolbar_asset>
        <Toolbar_Icon name="heart" />
        <Toolbar_name>5124</Toolbar_name>
      </Toolbar_asset>
      <Toolbar_asset>
        <Toolbar_Icon name="tag" />
        <Toolbar_name>23</Toolbar_name>
      </Toolbar_asset>
      <Toolbar_asset>
        <Toolbar_Icon name="user" />
        <Toolbar_name>13</Toolbar_name>
      </Toolbar_asset>
      <Toolbar_asset>
        <Toolbar_Icon name="bar-chart" />
        <Toolbar_name>4512</Toolbar_name>
      </Toolbar_asset>
    </Bottom_Toolbar_Left>
    <Bottom_Active>
      <Toolbar_Icon name="more-horizontal" />
    </Bottom_Active>
  </Bottom_Toolbar>
  );
}

const Bottom_Toolbar = styled(View)`
  flex: 1;
  flex-direction: row;
  margin: 12px 30px;
`;
const Bottom_Toolbar_Left = styled(View)`
  flex: 1;
  flex-direction: row;
`;

const Toolbar_asset = styled(View)`
  flex: 1;
  align-items: center;
  flex-direction: row;
`;
const Toolbar_Icon = styled(Feather)`
  font-size: 16px;
  color: #48464c;
  margin-right: 4px;
`;
const Toolbar_name = styled(Text)`
  font-size: 12px;
  color: #48464c;
`;

const Bottom_Active = styled(View)`
  flex: 0.1;
  align-items: flex-end;
`;
