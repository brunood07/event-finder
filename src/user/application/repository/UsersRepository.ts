import { Prisma, User } from '@prisma/client'

export default interface UsersRepository {
  register(data: Prisma.UserCreateInput): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByDocument(document: string): Promise<User | null>;
}