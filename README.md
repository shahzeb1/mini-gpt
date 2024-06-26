# MINI ChatGPT: React (vite) application

<img width="935" alt="image" src="https://github.com/shahzeb1/mini-gpt/assets/1383831/391ca7b1-0e44-435d-80bc-ef0011a29b7f">

🚀 View live demo: [gpt.shahzeb.co](https://gpt.shahzeb.co)

## Pocketbase:

[Pocketbase](https://pocketbase.io/) is used to store the prompts. Keep the `VITE_PROMPT_ENDPOINT` env var as an empty string if you do not want to use this feature.

Copy over the code from `pocket-base/main.pb.ts` onto your pocketbase server. [Instructions on extending pocket base via pb-hooks](https://pocketbase.io/docs/js-overview). Don't forget to restart the pb service.

## Cloudflare

Copy over the code in the `cloudflare/` to your Cloudflare function.

## Frontend:

1. Run `mv .env.example .env` to create a new .env file
1. Update the values with your cloudflare function and pocket base URL

Then you know the drill, `yarn i`, `yarn dev`.
