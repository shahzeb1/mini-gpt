import { useState } from "react";
import { promptRequest } from "./lib";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGoClick() {
    setLoading(true);
    const { response } = await promptRequest(prompt);
    setResponse(response);
    setLoading(false);
  }

  return (
    <>
      <Textarea
        placeholder="Your prompt here"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={loading}
      ></Textarea>
      <Button onClick={handleGoClick} disabled={loading}>
        Go
      </Button>
      {response && <div className="response-zone">{response}</div>}
    </>
  );
}
export default App;
