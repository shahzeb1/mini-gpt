/**
 * The following is code for your cloudflare function.
 */
import { Ai } from "./vendor/@cloudflare/ai.js";
import { handleRequest } from "./cors.js";

async function miniLLM(request, env) {
  const body = await request.json();
  const messages = body.messages;
  const ai = new Ai(env.AI);
  const response = await ai.run("@cf/meta/llama-2-7b-chat-int8", {
    messages,
  });
  return response;
}

export default {
  async fetch(request, env) {
    return handleRequest(request, env, miniLLM);
  },
};
