import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace'

export default function (typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginInlineTrace()]
  })

  return startStandaloneServer(server, {
    listen: { port: 4000 }
  })
}
