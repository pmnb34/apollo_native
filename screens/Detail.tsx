import React from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { gql, useQuery } from "@apollo/client";
const FEED_QUERY = gql`
  query Feed($feedId: Int!) {
    feed(id: $feedId) {
      feed {
        body
      }
    }
  }
`;

function Detail({ route }) {
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      feedId: route?.params?.feedId,
    },
  });
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{data?.feed?.feed?.body}</Text>
    </View>
  );
}

export default Detail;
