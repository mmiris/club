import Router from '@koa/router'
import uploadsMiddleware from '../middlewares/uploadsMiddleware.js'
import uploadsController from '../controllers/uploadsController.js'

const router = new Router({ prefix: '/uploads' })

router.post('/avatar', uploadsMiddleware.avatarUpload.single('avatar'), uploadsController.createAvatar)
router.post(
  '/file',
  uploadsMiddleware.fileUpload.array('files'),
  uploadsMiddleware.resizeImg,
  uploadsController.createFiles
)
// router.get('/file/:filename', uploadsController.downloadFile)

export default router
