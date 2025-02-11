import { compare } from 'bcrypt';
import prisma from '../prisma/prismaClient';

export type UserLoginData = {
  email: string;
  password: string;
};

export async function loginUser({ email, password }: UserLoginData) {
  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin || admin.password_digest == null) {
    throw new Error('Invalid email');
  }
  const isValid = await compare(password, admin.password_digest);

  if (!isValid) {
    throw new Error('Invalid password');
  }

  return admin;
}
