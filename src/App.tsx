import { useState, useEffect, useMemo } from "react";
import { WORDS, PROMPT_VOICE, voices } from "./lib";
import {
  Response,
  promptRequest,
  ResponseWithVoice,
  Database,
} from "./clients";

import { Textarea } from "@/components/ui/textarea";

import { Progress } from "@/components/ui/progress";

import "./App.css";
import Header from "./components/header";
import Responses from "./components/responses";
import ComposerButtons from "./components/composer-buttons";

function App() {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState<ResponseWithVoice[]>([]);
  const [randomWord, setRandomWord] = useState("a question");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const [promptVoice, setPromptVoice] = useState<voices>("none");
  const pb = useMemo(() => new Database(), []);

  useEffect(() => {
    if (loading === false) {
      setProgress(0);
      return;
    }

    const timer = setInterval(() => {
      const rand = Math.floor(Math.random() * (10 - 5 + 1) + 5);
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
  }, []);

  useEffect(() => {
    if (count) {
      return;
    }

    pb.getCount().then((count) => {
      setCount(count);
    });
  }, []);

  async function handleGoClick() {
    setLoading(true);
    const userInput: Response = {
      content: PROMPT_VOICE(prompt, promptVoice),
      role: "user",
      userInput: prompt,
    };
    const req = [...responses, userInput];
    const res = await promptRequest({ messages: req });
    const resWithVoice: ResponseWithVoice = {
      ...res,
      voice: promptVoice,
    };

    setPrompt("");
    setResponses([...responses, userInput, resWithVoice]);
    setLoading(false);

    // Save prompt to PB:
    pb.savePrompt(prompt, promptVoice);
  }

  return (
    <div className="container">
      <Header />

      {loading && (
        <div className="loading flex flex-col items-center justify-center">
          <Progress value={progress} className="w-[60%]" />
          <div className="mt-4 text-sm text-slate-700 dark:text-slate-300">
            Sit tight, an NVIDIA GPU somwehere is putting in work...
          </div>
        </div>
      )}

      {!responses.length && !loading && (
        <div className="loading fade-in flex flex-col  justify-center w-80">
          <div className="mt-4 text-sm text-slate-700 w-90 dark:text-slate-300">
            <div>
              You can ask it anything: perhaps {randomWord}. <br />
            </div>
            {count > 0 && (
              <div className="mt-2">
                Total prompts so far:
                <span className="pl-1 no-underline dark:text-white font-sans font-semibold text-sm">
                  {count}.
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {!loading &&
        responses.map((response, i) => (
          <Responses key={i} response={response} />
        ))}

      <div className="prompt-zone">
        <Textarea
          placeholder={
            responses.length ? "Your response here" : "Your prompt here"
          }
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        ></Textarea>
      </div>

      <ComposerButtons
        {...{ loading, responses, setPromptVoice, handleGoClick }}
      />
    </div>
  );
}
export default App;
