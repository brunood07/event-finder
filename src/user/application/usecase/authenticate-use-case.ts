import UseCase from '@/core/application/usecase/use-case'
import UsersRepository from '../repository/UsersRepository'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from '@/user/infra/errors/invalid-credentials'
import PasswordHash from '@/user/domain/entities/password-hash'
import { env } from '@/core/env'

interface AuthenticateUseCaseDTO {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export default class AuthenticateUseCase implements UseCase {
  constructor(private usersRepository: UsersRepository) {}

  execute = async (data: AuthenticateUseCaseDTO): Promise<AuthenticateUseCaseResponse> => {
    const { email, password } = data

    const user = await this.usersRepository.findByEmail(email)
    if (!user) throw new InvalidCredentialsError()

    const pass = new PasswordHash(user.password_hash, env.PASSWORD_SALT)
    const passwordMatches = await pass.validate(password)
    if (!passwordMatches) throw new InvalidCredentialsError()
    
    return {
      user
    }
  }
}