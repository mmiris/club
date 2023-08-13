import Router from '@koa/router'
import momentController from '../controllers/momentController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = new Router({ prefix: '/moment' })

router.get('/:id', momentController.getMoment)

router.get('/', momentController.getMomentList)

router.post('/', momentController.publishMoment)

router.patch('/:id', authMiddleware.authResourcePermission, momentController.updateMoment)

router.delete('/:id', authMiddleware.authResourcePermission, momentController.deleteMoment)

router.put('/:id/labels', authMiddleware.authResourceExists, momentController.addLabels)

export default router
