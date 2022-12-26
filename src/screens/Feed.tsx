import React from "react";
import { gql, useQuery } from "@apollo/client";
import { ActivityIndicator, View, Text, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const ALLFEED_QUERY = gql`
  query Query {
    allFeeds {
      body
      id
      updatedAt
      user {
        email
      }
    }
  }
`;
function Feed({ navigation }: any) {
  const { data, loading, refetch, fetchMore } = useQuery(ALLFEED_QUERY, {
    variables: {
      offset: 0,
    },
  });
  const Item = (item: any) => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "red" }} onPress={() => navigation.navigate("FeedDetail", { feedId: item.id })}>
        {item.body}
      </Text>
    </View>
  );
  const renderItem = ({ item }: any) => <Item {...item} />;

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
