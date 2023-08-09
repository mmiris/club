import Router from '@koa/router'
import commentController from '../controllers/commentController.js'

const router = new Router({ prefix: '/comment' })

router.post('/', commentController.publishComment)

router.post('/:id/reply', commentController.replyComment)

export default router
