import express from 'express'
import exitHook from 'async-exit-hook'
import cors from 'cors'
import { CLOSE_DB, CONNECT_DB, GET_DB } from '~/config/mongodb'
import env from '~/config/environment'
import { corsOptions } from '~/config/cors'
import { errorHandlingMiddleware } from '~/middlewares/error.middleware'

const START_SERVER = () => {
  const app = express()

  app.use(cors(corsOptions))

  // Enable req.body json data
  app.use(express.json())

  // Middleware handle concentration error
  app.use(errorHandlingMiddleware)

  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.send('Hello World!')
  })

  app.listen(env.APP_PORT, () => {
    console.log(`Example app listening on port ${env.APP_PORT}`)
  })

  exitHook(() => {
    console.log('Disconnected to Mongodb Cloud Atlas!')
    CLOSE_DB()
  })
}

CONNECT_DB()
  .then(() => console.log('Connected to Mongodb Cloud Atlas!'))
  .then(() => START_SERVER())
  .catch((err) => {
    console.log(err)
    process.exit(0)
  })
