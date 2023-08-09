import Router from '@koa/router'
import momentController from '../controllers/momentController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = new Router()

router.post('/moment', momentController.publishMoment)
router.patch('/moment/:id', authMiddleware.authResourcePermission, momentController.modifyMoment)
router.delete('/moment/:id', authMiddleware.authResourcePermission, momentController.deleteMoment)

export default router
