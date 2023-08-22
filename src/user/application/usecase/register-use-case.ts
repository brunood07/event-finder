import PasswordHash from '@/user/domain/entities/password-hash'
import UsersRepository from '../repository/UsersRepository'
import { User } from '@prisma/client'

interface CreateUserDTO {
  firstName: string
  lastName: string
  email: string
  document: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export default class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  execute = async (data: CreateUserDTO): Promise<RegisterUseCaseResponse> => {
    const { document, email, password } = data
    if (!document || !email) throw new Error('Missing information')
    const hasEmailAlreadyBeenUsed = await this.usersRepository.findByEmail(email)
    if (hasEmailAlreadyBeenUsed) throw new Error('Email already registered')
    const hasDocumentAlreadyBeenUsed = await this.usersRepository.findByDocument(document)
    if (hasDocumentAlreadyBeenUsed) throw new Error('Document already registered')

    const passordEncrypt = new PasswordHash(password)
    const password_hash = await passordEncrypt.hash(6)

    const user = await this.usersRepository.register({
      password_hash,
      ...data
    })

    return { user }
  }
}