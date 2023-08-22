import { prisma } from '@/core/database/prisma'
import UsersRepository from '@/user/application/repository/UsersRepository'
import { Prisma, User } from '@prisma/client'

export default class PrismaUsersRepository implements UsersRepository {
  async register(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }

  async findByDocument(document: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        document
      }
    })

    return user
  }
}