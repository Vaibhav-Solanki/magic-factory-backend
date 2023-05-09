import buildServer from './server.js'
import buildDb from './database/db.js'

export default async function () {
  // const server = await buildServer()
  const db = await buildDb()
  console.log(await db.select(db.raw('NOW()')))
}
