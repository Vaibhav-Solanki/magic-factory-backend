import { config } from 'dotenv'
import buildServer from './server.js'
import buildDb from './database/db.js'
import buildResolver from './resolvers.js'
import buildSchema from './schema.js'
import authWrapper from './utils/auth.js'

config()

export default async function () {
  const db = await buildDb()
  const resolver = await buildResolver(authWrapper)
  const typeDefs = await buildSchema()

  await buildServer(typeDefs, resolver)

  console.log('server stated')
}
