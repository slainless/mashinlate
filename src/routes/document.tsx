import { ConfirmFloater } from "~/components/ConfirmFloater"
import { NewDocumentProvider } from "~/components/context/new-document"
import { DocumentInputArea } from "~/components/DocumentInputArea"
import { LayoutMain } from "~/components/layout/main"

export default function Home() {
  // return null
  return (
    <LayoutMain>
      <DocumentInputArea />
      <ConfirmFloater position="sticky" bottom="2" />
    </LayoutMain>
  )
}
