import { defineConfig } from "@solidjs/start/config";
import { join } from 'vinxi/lib/path'

const resolve = (path: string) => join(process.cwd(), path)

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "styled-system": resolve("./styled-system"),
      }
    }
  }
});
