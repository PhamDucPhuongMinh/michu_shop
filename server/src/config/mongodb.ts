import { Db, MongoClient, ServerApiVersion } from 'mongodb'

const MONGGODB_URI =
  'mongodb+srv://phuongminh:E8FvPDdVcWhBUQQe@phamducphuongminh.udkmsfl.mongodb.net/?retryWrites=true&w=majority'
const DATABASE_NAME = 'phamducphuongminh'

let databaseInstance: Db | null = null

const mongoClientInstance = new MongoClient(MONGGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()

  databaseInstance = mongoClientInstance.db(DATABASE_NAME)
}

export const GET_DB = () => {
  if (!databaseInstance) throw new Error('Must connect to Database first!')
  return databaseInstance
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}
