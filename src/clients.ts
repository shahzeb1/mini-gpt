import { voices } from "./lib";
import PocketBase from "pocketbase";

const PROMPT_ENDPOINT = "https://llama.shahzeb001.workers.dev/";

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
  private ENDPOINT = "https://pb.shahzeb001.workers.dev";

  constructor() {
    this.pb = new PocketBase(this.ENDPOINT);
  }

  async getCount(): Promise<number> {
    const r = await fetch(`${this.ENDPOINT}/api/count`);
    const j = await r.json();
    return parseInt(j.count, 10);
  }

  async savePrompt(prompt: string, voice: voices) {
    const data = {
      prompt: prompt,
      voice: voice,
    };

    await this.pb.collection("prompts").create(data);
  }

  async saveAggregate() {
    const date = new Date();
    const data = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };
    await this.pb.collection("prompts_month").create(data);
  }
}
