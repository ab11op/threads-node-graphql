import express from 'express';
const app = express();
const PORT = process.env.PORT || 8002;
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

app.get('/', (req, res) => {
  res.json({ message: 'Server is up and running !' });
});
//

async function startServer() {
  app.use(express.json());
  const graphQlServer = new ApolloServer({ typeDefs: ``, resolvers: {} });
  await graphQlServer.start();
  app.use('/graphql', expressMiddleware(graphQlServer));
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
startServer();
