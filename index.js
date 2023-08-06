import Koa from 'koa'
import router from './routes/userRouter.js'
import bodyParser from '@koa/bodyparser'
import { port } from './config/appConfig.js'

const app = new Koa()

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, () => console.log(`Server listening on port ${port}.`))
