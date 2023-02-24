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
import AWS from "aws-sdk";
import { ENV } from "../../../env";
import { writeBody, writeImages, writeIsPrivate } from "../../components/Write/WriteStore";

import * as ExpoFileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
// const CREATEFEED_MUTATION = gql`
//   mutation CreateFeed($file: Upload!) {
//     createFeed(file: $file) {
//       message
//       success
//     }
//   }
// `;
const CREATEFEED_MUTATION = gql`
  mutation CreateFeed($body: String!, $images: [Images], $tags: [String], $location: Location) {
    createFeed(body: $body, images: $images, tags: $tags, location: $location) {
      message
      success
    }
  }
`;
const Stack = createStackNavigator();

function WriteStack() {
  const Images = useReactiveVar(writeImages);
  const body = useReactiveVar(writeBody);
  const isPrivate = useReactiveVar(writeIsPrivate);
  const onCompleted = (data) => {
    console.log(data);
  };

  const [writebtn, { data, loading, error }] = useMutation(CREATEFEED_MUTATION, {
    onCompleted,
  });

  // const handleChange = async () => {
  //   const s3 = new AWS.S3({
  //     accessKeyId: ENV.AWS_ACCESSKEY_ID,
  //     secretAccessKey: ENV.AWS_SECRETACCESSKEY,
  //     region: ENV.AWS_REGiON,
  //   });
  //   let imagesLocation = [];
  //   await Promise.all(
  //     image?.map(async (img, i) => {
  //       const buffer = Buffer.from(img.base64, "base64");
  //       await s3
  //         .upload({
  //           Bucket: "wareware-local",
  //           ContentType: image[0]?.type,
  //           Key: Date.now().toString() + Math.floor(Math.random() * 100000),
  //           Body: buffer,
  //         })
  //         .promise()
  //         .then((data) => {
  //           imagesLocation.push({
  //             index: i,
  //             location: data.Location,
  //           });
  //         });
  //     })
  //   );
  //   await writebtn({
  //     variables: {
  //       body: body,
  //       images: Images,
  //       isPrivate,
  //     },
  //   });
  // };

  // const onValid = async () => {
  // const file = new ReactNativeFile({
  //   uri: Images[0]?.uri,
  //   name: Images[0]?.filename,
  //   type: "image/jpeg",
  // });
  // console.log(file);

  // var path = require(Images[0]?.uri);
  //   let response = await fetch(Images[0]?.uri);
  //   var bufferImage = await response.arrayBuffer();

  //   writebtn({
  //     variables: {
  //       body: body,
  //       images: [file],
  //       isPrivate,
  //     },
  //   });
  // };
  const onValid = async () => {
    const s3 = new AWS.S3({
      accessKeyId: ENV.AWS_ACCESSKEY_ID,
      secretAccessKey: ENV.AWS_SECRETACCESSKEY,
      region: ENV.AWS_REGiON,
    });
    let imagesLocation = [];
    await Promise.all(
      Images?.map(async (file, i) => {
        const data = await MediaLibrary.getAssetInfoAsync(file.id);
        // const response = await ExpoFileSystem.getInfoAsync(data.localUri);
        // console.log(response);
        // const files = new ReactNativeFile({
        //   uri: data.localUri,
        //   name: file.filename,
        //   type: "image/jpeg",
        // });
        // console.log(files);
        const response = await fetch(data.localUri);
        const blob = await response.blob();
        await s3
          .upload({
            Bucket: "wareware-local",
            ContentType: "image/jpeg",
            Key: Date.now().toString() + Math.floor(Math.random() * 100000),
            Body: blob,
          })
          .promise()
          .then((data) => {
            imagesLocation.push({
              index: i,
              location: data.Location,
            });
          });
      })
    );
    await writebtn({
      variables: {
        body: body,
        images: imagesLocation,
        isPrivate,
      },
    });
  };
  // const onCompleted = (data) => {
  //   console.log(data);
  // };
  // const [writebtn, { data, loading, error }] = useMutation(CREATEFEED_MUTATION, {
  //   onCompleted,
  // });

  // const onValid = () => {
  //   const { file } = new ReactNativeFile({
  //     uri: writeData?.uri,
  //     name: writeData?.name,
  //     type: writeData?.type,
  //   });
  //   console.log(file);
  //   writebtn({
  //     variables: {
  //       file,
  //     },
  //   });
  // };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WriteHome"
        options={{
          presentation: "modal",
          headerTitle: "작성하기",
          headerBackTitleVisible: false,
          headerRight: () => <Button onPress={() => (Images ? onValid() : null)} title="업로드" color="red" />,
        }}
        component={Write}
      />
      <Stack.Screen
        name="ImageList"
        options={{
          presentation: "modal",
          headerTitle: "이미지",
          headerBackTitleVisible: false,
          // headerRight: () => <Button onPress={() => (writeData ? onValid() : null)} title="추가" color="red" />,
        }}
        component={ImageList}
      />
      <Stack.Screen
        name="ImageSelect"
        options={{
          presentation: "modal",
          headerTitle: "이미지선택",
          headerBackTitleVisible: false,
          // headerRight: () => <Button onPress={() => (writeData ? onValid() : null)} title="수정" color="red" />,
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
