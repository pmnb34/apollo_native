import { makeVar } from "@apollo/client";

export const writeImages = makeVar([]);
export const writeImagesPrev = makeVar([]);
export const writeImagesEdit = makeVar([]);
export const writeBody = makeVar("");
export const writeIsPrivate = makeVar(false);
export const writeHashTags = makeVar([]);
export const writeMentions = makeVar([]);
export const writeFocusTag = makeVar(false);
export const writeFocusMention = makeVar(false);
export const writeFocusPosition = makeVar(0);
