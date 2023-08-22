import UsersRepository from '@/user/application/repository/UsersRepository'
import { Prisma, User } from '@prisma/client'

export default class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async register(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: `user-${data.email}`,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      document: data.document,
      password_hash: data.password_hash,
      created_at: new Date()
    }

    this.users.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findByDocument(document: string): Promise<User | null> {
    const user = this.users.find(user => user.document === document)

    if (!user) {
      return null
    }

    return user
  }
}