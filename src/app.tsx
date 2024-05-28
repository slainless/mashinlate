import { MetaProvider, Title } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Suspense } from "solid-js"
import "./app.css"
import { AppStoreProvider } from "./components/context/app"
import { ActiveDocumentProvider } from "./components/context/active-document"
import { NewDocumentProvider } from "./components/context/new-document"
import { handleClientThemeCookie } from "./core/theme"

export default function App() {
  handleClientThemeCookie()
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <AppStoreProvider>
            <ActiveDocumentProvider>
              <NewDocumentProvider>
                <Suspense>{props.children}</Suspense>
              </NewDocumentProvider>
            </ActiveDocumentProvider>
          </AppStoreProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
