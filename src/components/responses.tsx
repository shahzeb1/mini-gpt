/**
 * Responses is a component that renders a response from the bot or the user.
 */
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AUTHOR_IMAGES, ResponseWithVoice, authors } from "../lib";

interface Props {
  response: ResponseWithVoice;
}

const Responses = (props: Props) => {
  const { response } = props;
  return (
    <div
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
  );
};

export default Responses;
