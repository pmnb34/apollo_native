import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { gql, useMutation } from "@apollo/client";
import { feedWritePayloadVar } from "../../store";
import Write from "../../screens/Write";
import { useReactiveVar } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";

const CREATEFEED_MUTATION = gql`
  mutation CreateFeed($file: Upload!) {
    createFeed(file: $file) {
      message
      success
    }
  }
`;

const Stack = createStackNavigator();

function WriteStack() {
  const writeData = useReactiveVar(feedWritePayloadVar);
  const onCompleted = (data) => {
    console.log(data);
  };
  const [writebtn, { data, loading, error }] = useMutation(CREATEFEED_MUTATION, {
    onCompleted,
  });

  const onValid = () => {
    const { file } = new ReactNativeFile({
      uri: writeData?.uri,
      name: writeData?.name,
      type: writeData?.type,
    });
    console.log(file);
    writebtn({
      variables: {
        file,
      },
    });
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WriteHome"
        options={{
          headerTitle: "작성하기",
          headerBackTitleVisible: false,
          headerRight: () => <Button onPress={() => (writeData ? onValid() : null)} title="업로드" color="red" />,
        }}
        component={Write}
      />
    </Stack.Navigator>
  );
}

export default WriteStack;
