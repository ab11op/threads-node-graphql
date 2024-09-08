import express from 'express';
const app = express();
const PORT = process.env.PORT || 8002;
import graphqlServer from './graphql/server';
import { expressMiddleware } from '@apollo/server/express4';

app.get('/', (req, res) => {
  res.json({ message: 'Server is up and running !' });
});

async function startServer() {
  app.use(express.json());
  app.use('/graphql', expressMiddleware(await graphqlServer()));
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
startServer();
