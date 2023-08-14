import { fileURLToPath } from 'node:url'
import path, { dirname } from 'node:path'
import multer from '@koa/multer'
import Jimp from 'jimp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class UploadsMiddleware {
  get avatarUpload() {
    return multer({ dest: 'uploads/avatar' }).single('avatar')
  }

  get fileUpload() {
    return multer({ dest: 'uploads/file' }).array('files')
  }

  async resizeImg(ctx, next) {
    const imgSizes = {
      small: { width: 200, height: Jimp.AUTO },
      medium: { width: 400, height: Jimp.AUTO },
      large: { width: 800, height: Jimp.AUTO }
    }
    const imgs = []
    ctx.files.forEach((file) => imgs.push(file.filename))

    for (const img of imgs) {
      const originalImg = await Jimp.read(path.join(__dirname, '../uploads/file', img))

      for (const size in imgSizes) {
        const { width, height } = imgSizes[size]
        const outputPath = path.join(__dirname, `../uploads/file/${size}_${img}`)

        const resizedImg = originalImg.resize(width, height)
        resizedImg.write(outputPath)
      }
    }

    await next()
  }
}

export default new UploadsMiddleware()
