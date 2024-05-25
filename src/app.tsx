import { MetaProvider, Title } from "@solidjs/meta"
import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Suspense } from "solid-js"
import "./app.css"
import { AppStoreProvider } from "./components/context/app"
// import { ActiveDocumentProvider } from "./components/context/active-document"

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          {/* <AppStoreProvider>
            <ActiveDocumentProvider>
              <Suspense>{props.children}</Suspense>
            </ActiveDocumentProvider>
          </AppStoreProvider> */}
          <AppStoreProvider>
            <Suspense>{props.children}</Suspense>
          </AppStoreProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
