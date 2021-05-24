const { ApolloServer, gql } = require('apollo-server-lambda');
const { typeDefs, resolvers } = require('./src/index.js')

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    playground: {
        endpoint: "/dev/graphql"
    },
    context: ({ event, context }) => ({
        headers: event.headers,
        functionName: context.functionName,
        event,
        context,
  }) 
});
exports.graphqlHandler = server.createHandler({
    cors: {
        origin: true,
        credentials: true,
      },
});
