export async function promptRequest(
  prompt: string
): Promise<{ response: string }> {
  const r = await fetch("https://llama.shahzeb001.workers.dev/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });
  const j = await r.json();
  return j;
}
