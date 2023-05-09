import { resolvers as buildResolvers } from './realm/index.js'

export default async function () {
  const resolvers = await buildResolvers()
  return resolvers
}
