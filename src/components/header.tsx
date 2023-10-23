/**
 * Header is a component that renders the header of the app.
 */

import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <div>
      <div className="flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <h2 className="text-lg font-semibold">
          <a href="/">Mini GPT</a>
        </h2>
        <div className="flex flex-row items-center">
          <h3 className="text-sm text-slate-500 dark:text-slate-300 w-60 lg:w-auto">
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
          <div className="ml-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
