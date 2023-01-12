import { writeHashTags, writeMentions } from "../WriteStore";
export const highlightHashtags = async (inputText: any) => {
  const regexHashtag = /(#[0-9a-zA-Z가-힣ㄱ-ㅎ]*)/iu;
  const parts = inputText.replaceAll("\n", " ").split(" ");
  const getHashTag = new Set(
    parts.filter((part: any) => part !== "" && part !== "#" && part.startsWith("#") && part.trim().match(regexHashtag))
  );
  const getMention = new Set(
    parts.filter(
      (part: any) =>
        part !== "" && part !== "@" && part.startsWith("@") && part.trim().match(/(@[0-9a-zA-Z가-힣ㄱ-ㅎ]*)/iu)
    )
  );
  writeHashTags([...getHashTag]);
  writeMentions([...getMention]);
};
