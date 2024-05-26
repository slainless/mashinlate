# Mashinlate

Built with [SolidJS](https://www.solidjs.com/), [PandaCSS](https://panda-css.com/), [ParkUI](https://park-ui.com/).

## Available Services

- Any version of ChatGPT: 3.5, 4.0, etc.
- Unofficial ChatGPT Proxy Server
- DeepL
- Google Translate
- Google Generative AI: Gemini 1.0 Pro

## Data Persistence

No data is stored on the server; all data is stored inside the client's browser.

## Server-side Notice

Server context is used only when necessary, such as when a task is deemed impossible to run inside a browser context. For example, translation procedures need to be executed in a server-side environment to avoid browser limitations.

Therefore, a server-side environment is a necessity.

## End-User Notice

Some services require the end-user to provide some form of access identification, such as an authorization key, API token, etc. This means the end-user must fully trust the deployed service/system to use the service provided. I, as the author of this software, WILL NOT TAKE ANY RESPONSIBILITY for any loss incurred from the usage of this system/service, as stated in this project license (MIT).

As of 26/05/2024, with the current implementation, only essential data is sent by the browser, and only during those moments. Additionally, the server will not store any of this data.
