/**
 * Header is a component that renders the header of the app.
 */

import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <div>
      <div className="flex flex-col items-start py-4">
        <div className="flex w-full justify-between">
          <h1 className="text-lg font-semibold w-full">
            <a href="/">mini gpt</a>
          </h1>
          <div>
            <ModeToggle />
          </div>
        </div>
        <div className="flex flex-row -mt-2">
          <BlogAndCodeLink />
        </div>
      </div>
    </div>
  );
};

const BlogAndCodeLink = () => (
  <div className="text-sm text-slate-500 dark:text-slate-300 sm:w-full">
    experiment by{" "}
    <a
      href="https://twitter.com/shahzebdev"
      className="underline underline-offset-4"
      target="_blank"
    >
      @shahzebdev
    </a>
    .{" "}
    <a
      href="https://blog.shahzeb.co/p/building-chatgpt-clone"
      className="underline underline-offset-4"
      target="_blank"
    >
      blog
    </a>{" "}
    &cup;{" "}
    <a
      href="https://github.com/shahzeb1/mini-gpt"
      className="underline underline-offset-4"
      target="_blank"
    >
      code
    </a>
  </div>
);

export default Header;
