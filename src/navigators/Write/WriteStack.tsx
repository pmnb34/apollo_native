import React from "react";
import { Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { gql, useMutation } from "@apollo/client";
import { feedWritePayloadVar } from "../../store";
import Write from "../../screens/Write";
import { useReactiveVar } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import WriteUpload from "../../screens/WriteUpload";
import ImageSelect from "../../screens/ImageSelect";
import ImageEditCrop from "../../screens/ImageEditCrop";
import ImageList from "../../screens/ImageList";
import ImageEditRotate from "../../screens/ImageEditRotate";

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
          presentation: "modal",
          headerTitle: "작성하기",
          headerBackTitleVisible: false,
          headerRight: () => <Button onPress={() => (writeData ? onValid() : null)} title="업로드" color="red" />,
        }}
        component={Write}
      />
      <Stack.Screen
        name="ImageList"
        options={{
          presentation: "modal",
          headerTitle: "이미지",
          headerBackTitleVisible: false,
          headerRight: () => <Button onPress={() => (writeData ? onValid() : null)} title="추가" color="red" />,
        }}
        component={ImageList}
      />
      <Stack.Screen
        name="ImageSelect"
        options={{
          presentation: "modal",
          headerTitle: "이미지선택",
          headerBackTitleVisible: false,
          headerRight: () => <Button onPress={() => (writeData ? onValid() : null)} title="수정" color="red" />,
        }}
        component={ImageSelect}
      />
      <Stack.Screen
        name="ImageEditCrop"
        options={{
          presentation: "transparentModal",
          headerShown: false,
          headerTitle: "이미지크롭",
          headerBackTitleVisible: false,

          // headerRight: () => <Button onPress={() => (writeData ? onValid() : null)} title="수정" color="red" />,
        }}
        component={ImageEditCrop}
      />
      <Stack.Screen
        name="ImageEditRotate"
        options={{
          presentation: "transparentModal",
          headerShown: false,
          headerTitle: "이미지회전",
          headerBackTitleVisible: false,

          // headerRight: () => <Button onPress={() => (writeData ? onValid() : null)} title="수정" color="red" />,
        }}
        component={ImageEditRotate}
      />
    </Stack.Navigator>
  );
}

export default WriteStack;
