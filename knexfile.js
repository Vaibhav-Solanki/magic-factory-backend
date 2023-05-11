import { config } from 'dotenv'
import buildConfig from './src/config.js'

config()
export default async function () {
  const { db } = buildConfig()
  return db
}
