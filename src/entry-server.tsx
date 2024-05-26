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
