import React from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { refresh } from "frontend/apollo";
const FEED_QUERY = gql`
  query Profile($profileId: String!) {
    profile(id: $profileId) {
      message
      success
      user {
        id
      }
    }
  }
`;

function ProfileDetail({ route }) {
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      profileId: `${route?.params?.feedId}`,
    },
  });
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{data?.feed?.feed?.body}</Text>
    </View>
  );
}

export default ProfileDetail;
