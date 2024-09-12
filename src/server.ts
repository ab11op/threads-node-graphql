import express from 'express';
const app = express();
const PORT = process.env.PORT || 8002;
import graphqlServer from './graphql/server';
import { expressMiddleware } from '@apollo/server/express4';
import { userServices } from './services/user';

app.get('/', (req, res) => {
  res.json({ message: 'Server is up and running !' });
});

async function startServer() {
  app.use(express.json());
  app.use(
    '/graphql',
    expressMiddleware(await graphqlServer(), {
      context: async ({ req }) => {
        // @ts-ignore
        const token = req.headers['token'] as string;
        try {
          const user = await userServices.decodeJwtToken(token);
          return { user };
        } catch (error) {
          return {};
        }
      },
    })
  );
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
startServer();
