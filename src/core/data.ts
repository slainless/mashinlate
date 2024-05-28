import Dexie, { type EntityTable } from "dexie"
import { Schema, type Document, type Service } from "./document"
import { Type, type Static } from "@sinclair/typebox"
import { TypeCompiler } from "@sinclair/typebox/compiler"
import { isServer } from "solid-js/web"

const Data = Type.Object({
  documents: Type.Record(Type.String(), Schema.Document),
  services: Type.Record(Type.String(), Schema.Service),
})
export type Data = Static<typeof Data>
const CompiledData = TypeCompiler.Compile(Data)

export type Database = Dexie & {
  documents: EntityTable<Document, "id">
  services: EntityTable<Service, "id">
}

export async function createDB(dbName?: string): Promise<Database | undefined> {
  if (isServer || dbName == null) return

  const db = new Dexie(dbName) as Database

  db.version(1).stores({
    documents: `id, text, lines, results, services, from, to`,
    services: `id, type, serviceName, init`,
  })

  return db
}

const mapId = <T extends { id: string }>(v: T) => [v.id, v] as const
export async function loadFromDB(db?: Database): Promise<Data> {
  if (isServer || db == null)
    return {
      documents: {},
      services: {},
    }

  const [documents, services] = await Promise.all([
    db.documents.toArray(),
    db.services.toArray(),
  ])

  const data = {
    documents: Object.fromEntries(documents.map(mapId)),
    services: Object.fromEntries(services.map(mapId)),
  }
  if (CompiledData.Check(data)) return data

  throw new TypeError("Data is not compatible with current schema!")
}

export async function writeToDB(db: Database, data: Data) {
  if (isServer) return

  await Promise.all([
    db.documents.bulkPut(Object.values(data.documents)),
    db.services.bulkPut(Object.values(data.services)),
  ])
}
