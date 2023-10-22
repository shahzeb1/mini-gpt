const ENDPOINT = "https://llama.shahzeb001.workers.dev/";

export interface Response {
  role: "system" | "user";
  /** content is the prompt we send to the server */
  content: string;
  /** user input is the string the user typed in */
  userInput?: string;
}

export interface ResponseWithVoice extends Response {
  voice?: voices;
}

interface PromptRequest {
  messages: ResponseWithVoice[];
}

export async function promptRequest(
  messages: PromptRequest
): Promise<Response> {
  const r = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messages),
  });

  const { response } = await r.json();

  return { content: response, role: "system" };
}

export const AUTHOR_IMAGES = {
  "Jane Austen": "janeausten.jpg",
  "Ernest Hemingway": "ernesthemingway.jpg",
  "John Steinbeck": "johnsteinbeck.jpg",
  "Mark Twain": "marktwain.jpg",
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
