import { useState, useEffect } from "react";
import {
  promptRequest,
  WORDS,
  Response,
  PROMPT_VOICE,
  voices,
  AUTHOR_IMAGES,
  ResponseWithVoice,
  authors,
} from "./lib";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState<ResponseWithVoice[]>([]);
  const [randomWord, setRandomWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [promptVoice, setPromptVoice] = useState<voices>("none");

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
  }

  return (
    <div className="container">
      <div className="flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <h2 className="text-lg font-semibold">
          <a href="/">Mini GPT</a>
        </h2>
        <h3 className="text-sm text-slate-500">
          an experiment by{" "}
          <a
            href="https://shahzeb.co"
            className="underline underline-offset-4"
            target="_blank"
          >
            @shahzeb
          </a>
          .{" "}
          <a
            href="https://shahzeb.co"
            className="underline underline-offset-4"
            target="_blank"
          >
            blog
          </a>{" "}
          &cup;{" "}
          <a
            href="https://shahzeb.co"
            className="underline underline-offset-4"
            target="_blank"
          >
            code
          </a>
        </h3>
      </div>

      {loading && (
        <div className="loading flex flex-col items-center justify-center">
          <Progress value={progress} className="w-[60%]" />
          <div className="mt-4 text-sm text-slate-700">
            Sit tight, an NVIDIA GPU somwehere is putting in work...
          </div>
        </div>
      )}

      {!responses.length && !loading && (
        <div className="loading flex flex-col items-center justify-center">
          <div className="mt-4 text-sm text-slate-700 w-90">
            You can ask it pretty much anything: perhaps {randomWord}.
          </div>
        </div>
      )}

      {!loading &&
        responses.map((response, i) => (
          <div
            key={i}
            className={`flex mt-4 mb-4 ${
              response.role === "system" ? "bg-teal-200" : "bg-slate-200"
            } rounded-sm`}
          >
            <div className="self-center p-4">
              <div
                className={`bot-icon rounded-sm overflow-hidden ${
                  response.role === "system" ? "bg-teal-400" : "bg-slate-400"
                }`}
              >
                {response.voice && AUTHOR_IMAGES[response.voice as authors] && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <img
                          src={AUTHOR_IMAGES[response.voice as authors]}
                          alt={response.voice}
                          className="opacity-70"
                        />
                      </TooltipTrigger>
                      <TooltipContent>{response.voice}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
            <div className="p-4 prose lg:prose-xl">
              {response.userInput ? response.userInput : response.content}
            </div>
          </div>
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

      <div className="flex justify-between mb-1">
        <Button onClick={handleGoClick} disabled={loading}>
          {responses.length ? "Respond" : "Go"}
        </Button>
        <div className="flex">
          <div className="mr-2">
            <Select onValueChange={(v) => setPromptVoice(v as voices)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Prompt Magic" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>System Voices</SelectLabel>
                  <SelectItem value="none">none</SelectItem>
                  <SelectItem value="brevity">Brevity</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Author</SelectLabel>
                  <SelectItem value="Jane Austen">Jane Austen</SelectItem>
                  <SelectItem value="Ernest Hemingway">
                    Ernest Hemingway
                  </SelectItem>
                  <SelectItem value="John Steinbeck">John Steinbeck</SelectItem>
                  <SelectItem value="Mark Twain">Mark Twain</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

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
      </div>
    </div>
  );
}
export default App;
