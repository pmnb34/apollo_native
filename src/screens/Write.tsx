import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import styled from "styled-components";
import DismissKeyboard from "../components/DismissKeyboard";
import { gql } from "@apollo/client";
import AuthorContainer from "../components/Write/Author";
import SparatorContainer from "../components/Separator";
import TextareaContainer from "../components/Write/Textarea";
import ImageContainer from "../components/Write/Images";
import TagMentionContainer from "../components/Write/TagMention";
import OptionContainer from "../components/Write/Options";

import { useReactiveVar } from "@apollo/client";
import { writeHashTags, writeMentions } from "../components/Write/WriteStore";

const CREATEFEED_MUTATION = gql`
  mutation CreateFeed($body: String!, $images: [Images], $tags: [String], $location: Location) {
    createFeed(body: $body, images: $images, tags: $tags, location: $location) {
      message
      success
    }
  }
`;
function Write() {
  const tags = useReactiveVar(writeHashTags);
  const mentions = useReactiveVar(writeMentions);

  // const onCompleted = (data) => {
  //   console.log(data);
  // };

  // const [writebtn, { data, loading, error }] = useMutation(CREATEFEED_MUTATION, {
  //   onCompleted,
  // });

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
  //       images: imagesLocation,
  //       isPrivate,
  //     },
  //   });
  // };

  // const getLocation = async () => {
  //   try {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status === "granted") {
  //       const {
  //         coords: { latitude, longitude },
  //       } = await Location.getCurrentPositionAsync();
  //       console.log(latitude);
  //       console.log(longitude);
  //     }
  //   } catch (e) {
  //     Alert.alert("위치정보를 가져올 수 없습니다.");
  //   }
  // };

  return (
    <DismissKeyboard style={{ flex: 1 }}>
      <Container>
        <Top>
          <AuthorContainer />
          <SparatorContainer />
          <TextareaContainer />
          <ImageContainer />
          {tags ? <TagMentionContainer type={"tag"} data={tags} /> : null}
          {mentions ? <TagMentionContainer type={"mention"} data={mentions} /> : null}
        </Top>
        <Bottom>
          <SparatorContainer />
          <OptionContainer />
        </Bottom>
      </Container>
    </DismissKeyboard>
  );
}

export default Write;

const Container = styled(View)`
  flex: 1;
  justify-content: space-between;
  background-color: #fff;
`;
const Top = styled(ScrollView)`
  flex: 1;
  padding: 20px 20px;
`;

const Bottom = styled(View)`
  width: 100%;
`;
