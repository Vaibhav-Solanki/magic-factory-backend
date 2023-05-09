import buildServer from './server.js'
import buildDb from './database/db.js'
import buildResolver from './resolvers.js'

export default async function () {
  // const server = await buildServer()
  const db = await buildDb()
  const resolver = await buildResolver()
  console.log(resolver)
  console.log(await db.select(db.raw('NOW()')))
}
