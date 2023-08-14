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
    try {
      const userId = ctx.state.user.id
      const momentId = ctx.request.body.id
      const files = ctx.files

      const result = await uploadsModel.createFiles(userId, momentId, files)
      ctx.body = { success: true, message: 'files upload succeed.', data: { result } }
    } catch (err) {
      throw err
    }
  }
}

export default new UploadsController()
