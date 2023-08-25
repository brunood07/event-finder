import PrismaUsersRepository from '../repository/PrismaUsersRepository'
import GetProfileUseCase from '@/user/application/usecase/get-profile-use-case'

export function makeGetProfileteUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getProfileUseCase = new GetProfileUseCase(usersRepository)

  return getProfileUseCase
}