import React from "react";
import { gql, useQuery } from "@apollo/client";
import { ActivityIndicator, View, Text, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components";
import SSAuthor from "../components/Author/Author";
import SSTagList from "../components/List/TagList";
import SSMentionList from "../components/List/MentionList";
import SSImageVerticalScroll from "../components/List/Image_Vertical_scroll";
import { Feather } from "@expo/vector-icons";
import SparatorContainer from "../components/Separator";
import SSBottomToolbar from "../components/Toolbar/Bottom";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";

const ALLFEED_QUERY = gql`
  query Query {
    allFeeds {
      body
      id
      images {
        index
        location
      }
      updatedAt
      user {
        username
        profile {
          avatar
        }
      }
    }
  }
`;
function Feed() {
  const navigation = useNavigation();
  const { data, loading, refetch, fetchMore } = useQuery(ALLFEED_QUERY, {
    variables: {
      offset: 0,
    },
  });
  const Item = (item: any) => (
    <FeedCard>
      <SSAuthor name={item?.user?.username} avatar={item?.user?.profile?.avatar} />
      <Feed_Desc onPress={() => navigation.navigate("FeedDetail",{id:item?.id} )}>
      {item?.body?.length > 150 
      ?<>
          <Feed_Desc_Text >{item?.body?.slice(0,150)}</Feed_Desc_Text>
          <Wrap_LoadMore locations={[0, 0.5,1.0]}   colors={[ 'rgba(255,255,255,0)','rgba(255,255,255,0.9)','#fff']}>
            <LoadMore >
              <More>
                <More_Text >더보기</More_Text>
              </More>
            </LoadMore>
          </Wrap_LoadMore>
        </>
      :<>
          <Feed_Desc_Text>{item?.body}</Feed_Desc_Text>
          {/* <SSTagList />
          <SSMentionList /> */}
      </>
      }
      </Feed_Desc>
      {item?.images?.length > 0 ? <SSImageVerticalScroll images={item?.images} /> : null}
      <SSBottomToolbar/>
      <SparatorContainer />
    </FeedCard>
  );
  const renderItem = ({ item }: any) => <Item {...item} />;
  console.log(data);
  if (loading) {
    return (
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? <ActivityIndicator color="black" /> : null}
      </View>
    );
  }
  return (
    <View>
      <FlatList
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.allFeeds}
        keyExtractor={(item) => "" + item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

export default Feed;

const FeedCard = styled(View)`
  flex: 1;
  background-color: #fff;
`;

const Feed_Desc = styled(TouchableOpacity)`
position: relative;
  flex: 1;
  margin: 0 30px;
`;
const Wrap_LoadMore = styled(LinearGradient)`
position: absolute;
bottom:0;
left:0;
width: 100%;
height:80px;
`;
const LoadMore = styled(View)`
flex:1;
flex-direction: row;
align-items: flex-end;
justify-content: end;
`;
const More = styled(View)`
  border: 1px solid #5455ec;
  padding: 4px 16px;
  border-radius: 50px;
  margin-right: 6px;
  margin-bottom: 6px;
`;
const More_Text = styled(Text)`
  color: #5455ec;
  font-size: 12px;
  font-weight:600;
`;
const Feed_Desc_Text = styled(Text)`
  color: #48464c;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
`;

