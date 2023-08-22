import PasswordHash from '@/user/domain/entities/password-hash'
import UsersRepository from '../repository/UsersRepository'
import { User } from '@prisma/client'
import ValidateCpf from '@/user/domain/entities/validate-cpf'
import ValidateEmail from '@/user/domain/entities/validate-email'
import { UserAlreadyExistsError } from '@/user/infra/errors/user-already-exists'
import { InvalidEmailError } from '@/user/infra/errors/invalid-email'
import { InvalidDocumentError } from '@/user/infra/errors/invalid-document'

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

    const isValidDocument = new ValidateCpf(document)
    if (!isValidDocument) throw new InvalidDocumentError()

    const isValidEmail = new ValidateEmail(email)
    if (!isValidEmail) throw new InvalidEmailError()

    const hasEmailAlreadyBeenUsed = await this.usersRepository.findByEmail(email)
    if (hasEmailAlreadyBeenUsed) throw new UserAlreadyExistsError()
    
    const hasDocumentAlreadyBeenUsed = await this.usersRepository.findByDocument(document)
    if (hasDocumentAlreadyBeenUsed) throw new UserAlreadyExistsError()

    const passordEncrypt = new PasswordHash(password)
    const password_hash = await passordEncrypt.hash(6)

    const user = await this.usersRepository.register({
      password_hash,
      ...data
    })

    return { user }
  }
}