import { MetaProvider, Title } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Suspense } from "solid-js"
import "./app.css"
import { AppStoreProvider } from "./components/context/app"
import { ActiveDocumentProvider } from "./components/context/active-document"
import { NewDocumentProvider } from "./components/context/new-document"
import { MonacoProvider } from "./components/MonacoProvider"
import { ThemeProvider } from "./components/ThemeProvider"

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <AppStoreProvider>
            <ActiveDocumentProvider>
              <NewDocumentProvider>
                <ThemeProvider>
                  <Suspense>
                    <MonacoProvider>{props.children}</MonacoProvider>
                  </Suspense>
                </ThemeProvider>
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
