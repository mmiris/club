import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import path, { dirname } from 'node:path'

import uploadsModel from '../models/uploadsModel.js'
import userModel from '../models/userModel.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class UploadsController {
  async createAvatar(ctx) {
    try {
      const userId = ctx.state.user.id
      const avatar = ctx.file
      const result = await uploadsModel.createAvatar(userId, avatar)
      await userModel.addAvatar(userId, avatar.destination)

      ctx.body = { success: true, message: 'Avatar upload succeed.', data: { result } }
    } catch (err) {
      throw err
    }
  }

  async createFiles(ctx) {
    console.log(ctx.files)
    ctx.body = { message: 'successful!!!' }
  }

  async downloadFile(ctx) {
    const filename = ctx.params.filename
    const filePath = path.join(__dirname, '../upload/avatar', filename)

    const readableStream = fs.createReadStream(filePath)

    ctx.type = 'image/png'

    ctx.body = readableStream
  }
}

export default new UploadsController()
