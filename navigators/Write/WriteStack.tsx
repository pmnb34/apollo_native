import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { gql, useMutation } from "@apollo/client";
import { feedWritePayloadVar } from "../../store";
import Write from "../../screens/Write";
import { useReactiveVar } from "@apollo/client";

const CREATEFEED_MUTATION = gql`
  mutation CreateFeed($body: String!) {
    createFeed(body: $body) {
      message
      success
    }
  }
`;

const Stack = createStackNavigator();

function WriteStack() {
  const writeData = useReactiveVar(feedWritePayloadVar);
  console.log(writeData);

  const onCompleted = (data) => {
    console.log(data);
    const {
      createFeed: { success },
    } = data;
    console.log(success);
  };
  const [writebtn, { data, loading, error }] = useMutation(CREATEFEED_MUTATION, {
    onCompleted,
  });

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WriteHome"
        options={{
          headerTitle: "작성하기",
          headerBackTitleVisible: false,
          headerRight: () => (
            <Button
              onPress={() => (writeData ? writebtn({ variables: { body: ` ` + writeData } }) : null)}
              title="업로드"
              color="red"
            />
          ),
        }}
        component={Write}
      />
    </Stack.Navigator>
  );
}

export default WriteStack;
