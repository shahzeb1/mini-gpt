import { useState } from "react";
import "./App.css";
function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  async function handleGoClick() {
    const r = await fetch("https://llama.shahzeb001.workers.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const { response } = await r.json();
    setResponse(response);
  }
  return (
    <>
      <textarea
        placeholder="Your prompt here"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
      <button onClick={handleGoClick}>Go</button>
      {response && <div className="response-zone">{response}</div>}
    </>
  );
}
export default App;
