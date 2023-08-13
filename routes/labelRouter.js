import Router from '@koa/router'
import labelController from '../controllers/labelController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = new Router({ prefix: '/label' })

router.get('/')

router.post('/', authMiddleware.authResourceExists, labelController.createLabel)

export default router
