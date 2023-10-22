const ENDPOINT = "https://llama.shahzeb001.workers.dev/";

export interface Response {
  response: string;
}

export async function promptRequest(prompt: string): Promise<Response> {
  const r = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const j = await r.json();

  return j;
}

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
