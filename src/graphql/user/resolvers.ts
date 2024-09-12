import { prisma } from '../../database/db';
import {
  userServices,
  createUserPayload,
  getUserTokenPayload,
} from '../../services/user';

const queries = {
  getUserToken: async (_: any, payload: getUserTokenPayload) => {
    const token = await userServices.getUserToken(payload);
    return token;
  },
  getCurrentLoggedInUser: async (_: any, prop: any, context: any) => {
    if (context || context.user) {
      const id = context.user.id;
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    }
    throw new Error('I dont know who you are');
  },
};
const mutations = {
  createUser: async (_: any, payload: createUserPayload) => {
    const res = await userServices.createUser(payload);
    return res?.id;
  },
};
export const resolvers = { queries, mutations };
