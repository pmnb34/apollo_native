import React from "react";
import { TouchableOpacity, View, Text ,ScrollView} from "react-native";
import { gql, useQuery } from "@apollo/client";
import styled from 'styled-components';
import { LinearGradient } from "expo-linear-gradient";
import SSAuthor from "../components/Author/Author";
import SSImageVerticalScroll from "../components/List/Image_Vertical_scroll";
import SparatorContainer from "../components/Separator";
import SSBottomToolbar from "../components/Toolbar/Bottom";
import SSTagList from "../components/List/TagList";
import SSMentionList from "../components/List/MentionList";
const FEED_QUERY = gql`
query Feed($feedId: Int!) {
  feed(id: $feedId) {
    feed {
      id
      body
      images {
        index
        location
        id
      }
      user {
        name
        profile {
          avatar
          name
        }
        username
      }
    }
  }
}
`;

function Detail({ route }:any) {
  const { data , loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      feedId: route?.params?.id,
    },
  });
  return (
    <FeedSingle>
    <FeedCard>
      <SSAuthor name={data?.feed?.feed?.user?.username} avatar={data?.feed?.feed?.user?.profile?.avatar} />
      <Feed_Desc>
        <Feed_Desc_Text>{data?.feed?.feed?.body}</Feed_Desc_Text>
        <SSTagList />
        <SSMentionList />
      </Feed_Desc>
      {data?.feed?.feed?.images?.length > 0 ? <SSImageVerticalScroll images={data?.feed?.feed?.images} /> : null}
      <SSBottomToolbar/>
      <SparatorContainer />
    </FeedCard>
    </FeedSingle>
  );
}

export default Detail;

const FeedSingle = styled(ScrollView)`
  flex:1;
`
const FeedCard = styled(View)`
  flex: 1;
  background-color: #fff;
`;

const Feed_Desc = styled(View)`
  position: relative;
  flex: 1;
  margin: 0 30px;
`;
const Feed_Desc_Text = styled(Text)`
  color: #48464c;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
`;


