import janeAusten from "../public/authors/janeausten.jpg";
import ernestHemingway from "../public/authors/ernesthemingway.jpg";
import johnSteinbeck from "../public/authors/johnsteinbeck.jpg";
import markTwain from "../public/authors/marktwain.png";

export const AUTHOR_IMAGES = {
  "Jane Austen": janeAusten,
  "Ernest Hemingway": ernestHemingway,
  "John Steinbeck": johnSteinbeck,
  "Mark Twain": markTwain,
};

export const WORDS = [
  "a poem",
  "a story",
  "a joke",
  "a song",
  "a recipe",
  "a quote",
  "a fact",
  "a question",
  "a riddle",
  "a secret",
  "a confession",
  "a compliment",
  "a complaint",
  "a review",
  "a description",
];

export type voices = ("none" | "brevity") | authors;
export type authors =
  | "Jane Austen"
  | "Ernest Hemingway"
  | "John Steinbeck"
  | "Mark Twain";

export const PROMPT_VOICE = (prompt: string, voice: voices): string => {
  switch (voice) {
    case "brevity":
      return `Within 4 sentences or less, answer the following prompt: ${prompt}`;
    case "Jane Austen":
      return `In the style of Jane Austen, answer the following prompt: ${prompt}`;
    case "Ernest Hemingway":
      return `In the style of Ernest Hemingway, answer the following prompt: ${prompt}`;
    case "John Steinbeck":
      return `In the style of John Steinbeck, answer the following prompt: ${prompt}`;
    case "Mark Twain":
      return `In the style of Mark Twain, answer the following prompt: ${prompt}`;
    default:
      return prompt;
  }
};
