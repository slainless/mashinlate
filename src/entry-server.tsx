// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server"
import { handleServerThemeCookie } from "./core/theme"

export default createHandler(() => {
  const theme = handleServerThemeCookie()

  return (
    <StartServer
      document={({ assets, children, scripts }) => (
        <html lang="en" data-theme={theme}>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="anonymous"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,100..900;1,100..900&display=swap"
              rel="stylesheet"
            />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      )}
    />
  )
})
