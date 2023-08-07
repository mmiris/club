import Koa from 'koa'
import registerRoutes from './routes/index.js'
import bodyParser from '@koa/bodyparser'
import port from './config/appConfig.js'
import errorHandler from './utils/errorhandler.js'

const app = new Koa()

app.use(errorHandler())
app.use(bodyParser())

registerRoutes(app)

app.listen(port, () => console.log(`Server listening on port ${port}.`))
