import Dexie, { type EntityTable } from "dexie"
import { Schema, type Document, type Service } from "./document"
import { Type, type Static } from "@sinclair/typebox"
import { TypeCompiler } from "@sinclair/typebox/compiler"
import { isServer } from "solid-js/web"

const Data = Type.Object({
  documents: Type.Array(Schema.Document),
})
export type Data = Static<typeof Data>
const CompiledData = TypeCompiler.Compile(Data)

export type Database = Dexie & {
  documents: EntityTable<Document, "id">
}

export async function createDB(dbName?: string): Promise<Database | undefined> {
  if (isServer || dbName == null) return

  const db = new Dexie(dbName) as Database

  db.version(1).stores({
    documents: `id, text, lines, results, services, from, to`,
  })

  await db.open()
  return db
}

export async function loadData(db?: Database): Promise<Data> {
  if (isServer || db == null)
    return {
      documents: [],
    }

  const [documents] = await Promise.all([db.documents.toArray()])

  const data = { documents }
  if (CompiledData.Check(data)) return data

  throw new TypeError("Data is not compatible with current schema!")
}

export async function writeData(db: Database, data: Data) {
  if (isServer) return

  await Promise.all([db.documents.bulkPut(data.documents)])
}
