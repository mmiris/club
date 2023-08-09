import Router from '@koa/router'
import userMiddleware from '../middlewares/userMiddleware.js'
import userController from '../controllers/userController.js'

const router = new Router()

router.post('/register', userMiddleware.validateUserRegistration, userController.registerUser)

router.post('/login', userMiddleware.validateUserLogin, userController.loginUser)

router.get('/hello', userController.hello)

export default router
