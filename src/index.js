import { config } from 'dotenv'
import buildServer from './server.js'
import buildDb from './database/db.js'
import buildResolver from './resolvers.js'
import buildSchema from './schema.js'
import authWrapper from './utils/auth.js'
import buildConfig from './config.js'

config()

export default async function () {
  const config = buildConfig()
  const db = await buildDb(config)
  const resolver = await buildResolver(authWrapper)
  const typeDefs = await buildSchema()

  await buildServer(typeDefs, resolver)

  console.log('server stated')
}
