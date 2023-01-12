import * as ImagePicker from "expo-image-picker";
import { writeImages, writeImagesPrev } from "../WriteStore";

export const selectImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: true,
    selectionLimit: 8,
    // base64: true,
    quality: 1,
  });
  if (!result.canceled) {
    writeImages(result.assets);
  }
};

export const imageDelete = (images: any, id: any) => {
  writeImagesPrev(images?.filter((img: any) => img.id !== id));
  writeImages(images?.filter((img: any) => img.id !== id));
};
