import { useReactiveVar } from "@apollo/client";
import { writeBody, writeFocusMention, writeFocusPosition, writeFocusTag } from "../WriteStore";
import { highlightHashtags } from "./highlightTagMention";

export const selectTagMentionBySheet = (e: any, type: any, focusTag: any, focusPosition: any, Body: any) => {
  const newHashtag = focusTag
    ? e._dispatchInstances.memoizedProps.children
    : type + e._dispatchInstances.memoizedProps.children;
  const newValue = Body.substring(0, focusPosition) + newHashtag + Body.substring(focusPosition) + " ";
  writeBody(newValue);
  highlightHashtags(newValue);
  writeFocusPosition(focusPosition + newHashtag.length);
  writeFocusMention(false);
  writeFocusTag(false);
};
