import knex from 'knex'
import pkg from 'objection'
const { knexSnakeCaseMappers } = pkg

export default function createKnexClient () {
  return knex({
    client: 'pg',
    connection: {
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      user: process.env.PG_USER,
      password: process.env.PG_PASS,
      database: 'magic_factory'
    },
    ...knexSnakeCaseMappers()
  })
}
