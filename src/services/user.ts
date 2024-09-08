import { prisma } from '../database/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface createUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}
export interface getUserTokenPayload {
  email: string;
  password: string;
}

const JWT_SECRET = 'ab11op';

export const userServices = {
  createUser: async (payload: createUserPayload) => {
    const { firstName, lastName, email, password } = payload;
    console.log('🚀 ~ createUser: ~ password:', password);
    try {
      const salt = bcrypt.genSaltSync(10);
      console.log('🚀 ~ createUser: ~ salt:', salt);
      const hashedPassword = bcrypt.hashSync(password, salt);
      return await prisma.user.create({
        data: {
          firstName,
          lastName,
          password: hashedPassword,
          email,
          salt,
        },
      });
    } catch (error: any) {
      console.log('error in creating user', error.stack ? error.stack : error);
    }
  },
  getUserByEmail: async (email: string) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  },
  getUserToken: async (payload: getUserTokenPayload) => {
    try {
      const { email, password } = payload;
      const existingUser = await userServices.getUserByEmail(email);
      if (!existingUser || existingUser === null)
        throw new Error('Email does not exist');
      const isPasswordValid = bcrypt.compareSync(
        password,
        existingUser.password
      );
      if (!isPasswordValid) throw new Error('Password is incorrect');
      const token = jwt.sign(
        { id: existingUser.id, email: existingUser.email },
        JWT_SECRET
      );
      return token;
    } catch (error: any) {
      console.log('error in getting user token', error);
      return error.stack ? error.stack : error;
    }
  },
};
