import UseCase from '@/core/application/usecase/use-case'
import UsersRepository from '../repository/UsersRepository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '@/user/infra/errors/resource-not-found'

interface GetUserProfileInterface {
  userId: string;
}

type GetUserProfileResponse = {
  user: Omit<User, 'password_hash'>
}

export default class GetProfileUseCase implements UseCase {
  constructor(private usersRepository: UsersRepository) {}

  execute = async (data: GetUserProfileInterface): Promise<GetUserProfileResponse> => {
    const { userId } = data

    const userFound = await this.usersRepository.findById(userId)
    if (!userFound) throw new ResourceNotFoundError()
    const user = {
      id: userFound.id,
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      email: userFound.email,
      document: userFound.document,
      created_at: userFound.created_at
    }

    return { user }
  }
}