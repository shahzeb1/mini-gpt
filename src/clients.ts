import { voices } from "./lib";
import PocketBase from "pocketbase";

const PROMPT_ENDPOINT = import.meta.env.VITE_PROMPT_ENDPOINT ?? "";
const POCKET_BASE_ENDPOINT = import.meta.env.VITE_POCKET_BASE_ENDPOINT ?? "";

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
  if (!PROMPT_ENDPOINT) {
    throw new Error(
      "Follow instructions to add VITE_PROMPT_ENDPOINT to your env variables"
    );
  }

  const r = await fetch(PROMPT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messages),
  });

  const { response } = await r.json();

  return { content: response, role: "system" };
}

export class Database {
  private pb: PocketBase;

  constructor() {
    this.pb = new PocketBase(POCKET_BASE_ENDPOINT);
  }

  async getCount(): Promise<number> {
    if (!POCKET_BASE_ENDPOINT) {
      return 0;
    }

    const r = await fetch(`${POCKET_BASE_ENDPOINT}/api/count`);
    const j = await r.json();
    return parseInt(j.count, 10);
  }

  async savePrompt(prompt: string, voice: voices) {
    if (!POCKET_BASE_ENDPOINT) {
      return;
    }

    const data = {
      prompt,
      voice,
    };

    await this.pb.collection("prompts").create(data);
  }
}
