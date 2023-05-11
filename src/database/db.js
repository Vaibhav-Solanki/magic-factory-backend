import knex from 'knex'
import pkg from 'objection'
const { knexSnakeCaseMappers } = pkg

export default function createKnexClient ({ db }) {
  return knex({
    ...db,
    ...knexSnakeCaseMappers()
  })
}
