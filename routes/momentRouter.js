import Router from '@koa/router'
import momentController from '../controllers/momentController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = new Router({ prefix: '/moment' })

router.get('/:id', momentController.getMoment)

router.get('/', momentController.getMomentList)

router.post('/', momentController.publishMoment)

router.patch('/:id', authMiddleware.authResourcePermission, momentController.modifyMoment)

router.delete('/:id', authMiddleware.authResourcePermission, momentController.deleteMoment)

export default router
