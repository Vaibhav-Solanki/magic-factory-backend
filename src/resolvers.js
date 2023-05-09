import { fetchResolvers } from './realm/index.js'

export default async function (authWrapper) {
  const resolvers = await fetchResolvers(authWrapper)
  return resolvers
}
