import { ResponseWithVoice } from "@/clients";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { voices } from "@/lib";

interface Props {
  loading: boolean;
  responses: ResponseWithVoice[];
  setPromptVoice: (voice: voices) => void;
  handleGoClick: () => void;
}

const ComposerButtons = (props: Props) => {
  const { loading, responses, setPromptVoice, handleGoClick } = props;

  return (
    <div className="flex mb-1">
      <Button onClick={handleGoClick} disabled={loading}>
        {responses.length ? "Respond" : "Go"}
      </Button>
      <div className="flex">
        <div className="mr-2 ml-2">
          <Select onValueChange={(v) => setPromptVoice(v as voices)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Author Voice" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>System Voices</SelectLabel>
                <SelectItem value="none">None</SelectItem>
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

        {false && (
          <div className="invisible md:visible">
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
        )}
      </div>
    </div>
  );
};

export default ComposerButtons;
