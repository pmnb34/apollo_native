import React, { useState, useRef, useMemo, useCallback } from "react";
import { View, ScrollView, Text, TextInput, Image, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import styled from "styled-components";
import DismissKeyboard from "../components/DismissKeyboard";
import * as ImagePicker from "expo-image-picker";
import { gql, useMutation } from "@apollo/client";
import AWS from "aws-sdk";
import { Buffer } from "buffer";
import * as Location from "expo-location";
import { ENV } from "../../env";
import { Feather } from "@expo/vector-icons";
import { Col, Row, Grid } from "react-native-easy-grid";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import BottomSheetContainer from "../components/BottomSheetContainer";
const CREATEFEED_MUTATION = gql`
  mutation CreateFeed($body: String!, $images: [String], $tags: [String], $location: Location) {
    createFeed(body: $body, images: $images, tags: $tags, location: $location) {
      message
      success
    }
  }
`;
function Write() {
  const [image, setImage] = useState([]); // 이미지 썸네일

  const sheetEmailRef = useRef();
  const sheetEmailRef2 = useRef();
  const snapPoints = useMemo(() => ["60%"], []);
  const sheetEmail = useCallback(() => {
    sheetEmailRef.current?.present();
  }, []);
  const sheetEmail2 = useCallback(() => {
    sheetEmailRef2.current?.present();
  }, []);
  const backdrop = useCallback(
    (props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
    []
  );

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 8,
      // base64: true,
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      // console.log(result.assets);
      setImage(result.assets);
    }
  };

  // const onChangeBody = (text) => {
  //   feedWritePayloadVar({
  //     ...writeData,
  //     body: text,
  //   });
  // };
  // const onChangeTag = (text) => {
  //   feedWritePayloadVar({
  //     ...writeData,
  //     tags: text,
  //   });
  // };
  const onCompleted = (data) => {
    console.log(data);
  };

  const [writebtn, { data, loading, error }] = useMutation(CREATEFEED_MUTATION, {
    onCompleted,
  });

  const handleChange = async () => {
    const buffer = Buffer.from(imageResult.base64, "base64");

    const s3 = new AWS.S3({
      accessKeyId: ENV.AWS_ACCESSKEY_ID,
      secretAccessKey: ENV.AWS_SECRETACCESSKEY,
      region: ENV.AWS_REGiON,
    });
    const { Location } = await s3
      .upload({
        Bucket: "wareware-local",
        ContentType: type,
        Key: Date.now().toString() + Math.floor(Math.random() * 100000),
        Body: buffer,
      })
      .promise();

    await writebtn({
      variables: {
        file: Location,
      },
    });
  };

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync();
        console.log(latitude);
        console.log(longitude);
      }
    } catch (e) {
      Alert.alert("위치정보를 가져올 수 없습니다.");
    }
  };

  const imageRender = (image) => {
    if (image) {
      switch (image.length) {
        case 1: {
          return image?.map((img, index) => {
            return (
              <Row key={index} style={{ width: "100%", height: 200 }}>
                <Images source={{ uri: img.uri }} />
              </Row>
            );
          });
        }
        case 2: {
          return image?.map((img, index) => {
            return (
              <Row key={index} style={{ width: "50%", height: 200 }}>
                <Images source={{ uri: img.uri }} />
              </Row>
            );
          });
        }
        case 3: {
          return (
            <>
              <Col style={{ width: "50%", height: 300 }}>
                {image?.map((img, index) => {
                  if (index < 1) {
                    return <Images key={index} style={{ width: "100%", height: 300 }} source={{ uri: img.uri }} />;
                  }
                })}
              </Col>
              <Col style={{ width: "50%", height: 200 }}>
                {image?.map((img, index) => {
                  if (index > 0) {
                    return (
                      <Row key={index} style={{ width: "100%", height: 150 }}>
                        <Images style={{ width: "100%", height: 150 }} source={{ uri: img.uri }} />
                      </Row>
                    );
                  }
                })}
              </Col>
            </>
          );
        }
        case 4: {
          return image?.map((img, index) => {
            return (
              <Row key={index} style={{ width: "50%", height: 200 }}>
                <Images source={{ uri: img.uri }} />
              </Row>
            );
          });
        }
        case 5:
          return image?.map((img, index) => {
            if (index < 2) {
              console.log(index);
              return (
                <Row key={index} style={{ width: "50%", height: 200 }}>
                  <Images source={{ uri: img.uri }} />
                </Row>
              );
            } else {
              return (
                <Col key={index} style={{ width: "33.3333%", height: 100 }}>
                  <Images style={{ width: "100%", height: 100 }} source={{ uri: img.uri }} />
                </Col>
              );
            }
          });
        default:
          return null;
      }
    }
    return null;
  };

  const imageDelete = (assetId) => {
    console.log(assetId);
    setImage(image.filter((item) => item.assetId !== assetId));
  };
  const tagCheck = (e) => {
    if (e.nativeEvent.key === "#") {
      console.log("작동");
    }
    if (e.nativeEvent.key === "@") {
      console.log("이름작동");
    }
  };
  const changeText = (text) => {
    console.log(text);
  };
  return (
    <DismissKeyboard style={{ flex: 1 }}>
      <BottomSheetContainer>
        <Container>
          <Top>
            <TouchableWithoutFeedback>
              <Ahthor>
                <Avatar resizeMode="contain" source={require("../../assets/logo.png")} />
                <Name>굿스마일</Name>
              </Ahthor>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Sparator></Sparator>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <TopInner>
                <TextArea
                  placeholder="무슨 일이 일어나고 있나요?"
                  placeholderTextColor={"rgba(128, 131, 255, 0.5)"}
                  multiline={true}
                  onChangeText={(e) => changeText(e)}
                  onKeyPress={(e) => tagCheck(e)}
                />
              </TopInner>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={{ flexGrow: 1 }}>
                <TouchableWithoutFeedback>
                  <ScrollBox>
                    {image.length > 0 ? (
                      image?.map((img, index) => (
                        <ImagesBox key={index}>
                          <ButtonWrap>
                            <TouchableOpacity onPress={() => imageDelete(img.assetId)}>
                              <Feather name="x-circle" size={30} color="black" />
                            </TouchableOpacity>
                          </ButtonWrap>
                          <Images source={{ uri: img.uri }} />
                        </ImagesBox>
                      ))
                    ) : (
                      <TouchableOpacity onPress={selectImage}>
                        <Feather name="plus" size={24} color="black" />
                      </TouchableOpacity>
                    )}
                  </ScrollBox>
                </TouchableWithoutFeedback>
              </ScrollView>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <TagView>
                <TagOuter>
                  <Tag>피규어</Tag>
                </TagOuter>
                <TagOuter>
                  <Tag>굿스마일</Tag>
                </TagOuter>
                <TagOuter>
                  <Tag>사람</Tag>
                </TagOuter>
                <TagOuter>
                  <Tag>장난감</Tag>
                </TagOuter>
                <TagOuter>
                  <Tag>굿스마일</Tag>
                </TagOuter>
                <TagOuter>
                  <Tag>사람</Tag>
                </TagOuter>
                <TagOuter>
                  <Tag>장난감</Tag>
                </TagOuter>
                <TagOuter>
                  <Tag>기윰</Tag>
                </TagOuter>
              </TagView>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <UserTagView>
                <UserTagOuter>
                  <UserTag>@User</UserTag>
                </UserTagOuter>
                <UserTagOuter>
                  <UserTag>@fdsafdasdf</UserTag>
                </UserTagOuter>
                <UserTagOuter>
                  <UserTag>@regtrhbrth</UserTag>
                </UserTagOuter>
                <UserTagOuter>
                  <UserTag>@rtehetbhf</UserTag>
                </UserTagOuter>
                <UserTagOuter>
                  <UserTag>@frwrefwe</UserTag>
                </UserTagOuter>
              </UserTagView>
            </TouchableWithoutFeedback>
          </Top>

          {/* {image?.map((img, index) => (
                  <Images key={index} source={{ uri: img.uri }} />
                ))} */}

          <Bottom>
            <Sparator></Sparator>
            <BottomBottom>
              <BottomIcon name="image" size={24} color="black" onPress={selectImage} />

              <TouchableOpacity onPress={sheetEmail2}>
                <BottomIcon name="tag" size={24} color="black" />
              </TouchableOpacity>
              <BottomSheetModal ref={sheetEmailRef2} index={0} snapPoints={snapPoints} backdropComponent={backdrop}>
                <Text>태그 검색 및 선택 기능</Text>
              </BottomSheetModal>
              <TouchableOpacity onPress={sheetEmail2}>
                <BottomIcon name="users" size={24} color="black" />
              </TouchableOpacity>
              <BottomSheetModal ref={sheetEmailRef2} index={0} snapPoints={snapPoints} backdropComponent={backdrop}>
                <Text>유저 검색 및 선택 기능</Text>
              </BottomSheetModal>

              <TouchableOpacity onPress={sheetEmail}>
                <BottomIcon name="unlock" size={24} color="black" />
              </TouchableOpacity>
              <BottomSheetModal ref={sheetEmailRef} index={0} snapPoints={snapPoints} backdropComponent={backdrop}>
                <Text>전체공개 선택</Text>
                <Text>나만보기 선택</Text>
              </BottomSheetModal>
            </BottomBottom>
          </Bottom>
        </Container>
      </BottomSheetContainer>
    </DismissKeyboard>
  );
}

export default Write;
const Ahthor = styled(View)`
  flex-direction: row;
  align-items: center;
`;
const Avatar = styled(Image)`
  width: 60px;
  height: 60px;
  margin-right: 12px;
`;
const Name = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
`;

const TextArea = styled(TextInput)`
  width: 100%;
  margin-bottom: 5px;
`;
const TagArea = styled(TextInput)`
  width: 100%;
  height: 50px;
  align-items: flex-start;
`;
const ImageArea = styled(Grid)`
  width: 100%;
  height: 100px;
  flex-direction: row;
  flex-wrap: wrap;
`;
const Images = styled(Image)`
  width: 100%;
  height: 200px;
`;
const ImageScroll = styled(ScrollView)``;
const ImagesBox = styled(View)`
  width: 200px;
  margin-right: 10px;
  border-radius: 10px;
  overflow: hidden;
`;
const ScrollBox = styled(View)`
  flex-direction: row;
  margin-bottom: 10px;
`;
const ButtonWrap = styled(View)`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1;
`;
const TagView = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
`;
const TagOuter = styled(View)`
  background: blue;
  border-radius: 50px;
  overflow: hidden;
  margin-right: 4px;
  margin-bottom: 4px;
`;
const Tag = styled(Text)`
  color: #fff;
  padding: 6px 12px;
`;
const UserTagView = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;
const UserTagOuter = styled(View)`
  background: #555;
  border-radius: 50px;
  overflow: hidden;
  margin-right: 4px;
  margin-bottom: 4px;
`;
const UserTag = styled(Text)`
  color: #fff;
  padding: 6px 12px;
`;

const Container = styled(View)`
  flex: 1;
  justify-content: space-between;
  background-color: #fff;
`;
const Top = styled(ScrollView)`
  flex: 1;
  padding: 20px 20px;
`;
const TopInner = styled(View)`
  padding-bottom: 10px;
`;
const Bottom = styled(View)`
  width: 100%;
`;
const Sparator = styled(View)`
  border: 0.5px solid #e9e9e9;
`;
const BottomTop = styled(View)`
  width: 100%;
  padding: 0 20px;
  background-color: #aaa;
  align-items: center;
  flex-direction: row;
`;
const BottomBottom = styled(View)`
  flex-direction: row;

  padding: 14px 20px;
`;
const BottomIcon = styled(Feather)`
  margin-right: 20px;
`;

const Btn = styled(TouchableOpacity)`
  width: 100%;
  height: ${({ line }) => (line ? "20px" : "48px")};
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: ${({ line, theme }) => (line ? "transparent" : theme.btn.btnBgColor)};
  border: 1px solid ${({ line, theme }) => (line ? "transparent" : theme.btn.btnBgColor)};
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  margin-top: 10px;
  border-radius: 50px;
`;
const BtnText = styled(Text)`
  text-align: center;
  justify-content: center;
  align-items: center;
  color: ${({ line, theme }) => (line ? theme.btn.btnFontColor_line : theme.whiteColor)};
`;
