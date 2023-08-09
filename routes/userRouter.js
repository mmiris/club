import Router from '@koa/router'
import userMiddleware from '../middlewares/userMiddleware.js'
import userController from '../controllers/userController.js'

const router = new Router()

router.post(
  '/register',
  userMiddleware.validateUserRegistration,
  userMiddleware.encryptPassword,
  userController.registerUser
)

router.get('/hello', userController.hello)

export default router
