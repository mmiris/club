import Router from '@koa/router'
import userController from '../controllers/userController.js'

const router = new Router()

router.post('/user', userController.registerUser)

export default router
