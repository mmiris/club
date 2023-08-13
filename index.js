import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from '@koa/bodyparser'
import authMiddleware from './middlewares/authMiddleware.js'
import registerRoutes from './routes/index.js'
import port from './config/appConfig.js'
import errorHandler from './utils/errorhandler.js'

const app = new Koa()

app.use(cors())

app.use(errorHandler())

app.use(await authMiddleware.verifyAuth())
app.use(bodyParser())

registerRoutes(app)

app.listen(port, () => console.log(`Server listening on port ${port}.`))
