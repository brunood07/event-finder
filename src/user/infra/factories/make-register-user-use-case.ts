import RegisterUseCase from '@/user/application/usecase/register-use-case'
import PrismaUsersRepository from '../repository/PrismaUsersRepository'

export function makeRegisterUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}