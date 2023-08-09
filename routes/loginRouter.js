import Router from '@koa/router'
import authMiddleware from '../middlewares/authMiddleware.js'
import authController from '../controllers/authController.js'

const router = new Router()

router.post('/login', authMiddleware.validateUserLogin, authController.loginUser)

export default router
