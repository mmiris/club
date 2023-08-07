import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function registerRoutes(app) {
  const routeFiles = await fs.readdir(__dirname)

  for (const file of routeFiles) {
    if (file !== 'index.js') {
      const routeModule = await import(`./${file}`)
      app.use(routeModule.default.routes()).use(routeModule.default.allowedMethods())
    }
  }
}

export default registerRoutes
