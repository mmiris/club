import Router from '@koa/router'
import uploadsMiddleware from '../middlewares/uploadsMiddleware.js'
import uploadsController from '../controllers/uploadsController.js'

const router = new Router({ prefix: '/uploads' })

router.post('/avatar', uploadsMiddleware.avatarUpload, uploadsController.createAvatar)
router.post('/file', uploadsMiddleware.fileUpload, uploadsMiddleware.resizeImg, uploadsController.createFiles)

export default router
