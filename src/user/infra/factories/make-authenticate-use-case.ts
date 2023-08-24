import AuthenticateUseCase from '@/user/application/usecase/authenticate-use-case'
import PrismaUsersRepository from '../repository/PrismaUsersRepository'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}