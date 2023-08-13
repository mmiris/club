import Router from '@koa/router'
import authMiddleware from '../middlewares/authMiddleware.js'
import commentController from '../controllers/commentController.js'

const router = new Router({ prefix: '/comment' })

router.get('/', commentController.getComment)

router.post('/', commentController.publishComment)

router.post('/:id/reply', commentController.replyComment)

router.patch('/:id', authMiddleware.authResourcePermission, commentController.updateComment)

router.delete('/:id', authMiddleware.authResourcePermission, commentController.deleteComment)

export default router
