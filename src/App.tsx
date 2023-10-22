import { useState, useEffect } from "react";
import { promptRequest, WORDS } from "./lib";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [randomWord, setRandomWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading === false) {
      setProgress(0);
      return;
    }

    const timer = setInterval(() => {
      const rand = Math.floor(Math.random() * (20 - 5 + 1) + 5);
      const newProgress = progress + rand;
      setProgress(newProgress);
    }, 500);

    return () => clearTimeout(timer);
  }, [progress, loading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomWord(WORDS[Math.floor(Math.random() * WORDS.length)]);
    }, 3000);

    return () => clearInterval(interval);
  });

  async function handleGoClick() {
    setLoading(true);
    const { response } = await promptRequest(prompt);
    setResponse(response);
    setLoading(false);
  }

  return (
    <div className="container">
      <div className="flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <h2 className="text-lg font-semibold">Mini GPT</h2>
        <h3 className="text-sm text-slate-700">
          an experiment by{" "}
          <a
            href="https://shahzeb.co"
            className="underline underline-offset-4"
            target="_blank"
          >
            @shahzeb
          </a>
        </h3>
      </div>

      <div className="prompt-zone">
        <Textarea
          placeholder="Your prompt here"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        ></Textarea>
      </div>

      <div className="flex justify-between">
        <Button onClick={handleGoClick} disabled={loading}>
          Go
        </Button>
        <div>
          <Select defaultValue="llama-2-7b-chat-int8">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Meta</SelectLabel>
                <SelectItem value="llama-2-7b-chat-int8">
                  llama-2-7b-chat-int8
                </SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Open AI</SelectLabel>
                <SelectItem value="GPT-3" disabled>
                  GPT-3 (coming soon)
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading && (
        <div className="loading flex flex-col items-center justify-center">
          <Progress value={progress} className="w-[60%]" />
          <div className="mt-4 text-sm text-slate-700">
            Sit tight, an NVIDIA GPU somwehere is putting in work...
          </div>
        </div>
      )}

      {!response && !loading && (
        <div className="loading flex flex-col items-center justify-center">
          <div className="mt-4 text-sm text-slate-500 w-90">
            You can ask it pretty much anything perhaps {randomWord}.
          </div>
        </div>
      )}

      {response && !loading && (
        <div className="flex mt-4 bg-slate-200 rounded-sm">
          <div className="self-center p-4">
            <div className="bot-icon rounded-sm bg-slate-400"></div>
          </div>
          <div className="p-4 prose lg:prose-xl">{response}</div>
        </div>
      )}
    </div>
  );
}
export default App;
