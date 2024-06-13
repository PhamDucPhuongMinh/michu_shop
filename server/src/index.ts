import express from 'express'
import exitHook from 'async-exit-hook'
import { CLOSE_DB, CONNECT_DB, GET_DB } from './config/mongodb'

const START_SERVER = () => {
  const app = express()
  const port = 8080
  app.get('/', async (req, res) => {
    console.log(await GET_DB().listCollections().toArray())
    res.send('Hello World!')
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
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
