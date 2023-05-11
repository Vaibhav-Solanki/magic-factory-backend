export default function () {
  return {
    db: {
      client: 'pg',
      connection: {
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        database: 'magic_factory',
        user: process.env.PG_USER,
        password: process.env.PG_PASS
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        directory: './src/database/migrations',
        table_name: 'knex_migrations',
        tableName: 'knex_migrations'
      }
    }
  }
}
