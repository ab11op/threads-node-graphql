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
};
const mutations = {
  createUser: async (_: any, payload: createUserPayload) => {
    console.log('🚀 ~ createUser: ~ payload:', payload);
    const res = await userServices.createUser(payload);
    return res?.id;
  },
};
export const resolvers = { queries, mutations };
