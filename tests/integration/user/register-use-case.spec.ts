import RegisterUseCase from '@/user/application/usecase/register-use-case'
import { InvalidDocumentError } from '@/user/infra/errors/invalid-document'
import { InvalidEmailError } from '@/user/infra/errors/invalid-email'
import { UserAlreadyExistsError } from '@/user/infra/errors/user-already-exists'
import InMemoryUsersRepository from '@/user/infra/repository/InMemoryUsersRepository'
import { beforeEach, describe, expect, it } from 'vitest'

let registerUseCase: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    registerUseCase = new RegisterUseCase(new InMemoryUsersRepository())
  })

  it('should be able to register a new user', async () => {
    const { user } = await registerUseCase.execute({
      firstName: 'John',
      lastName: 'Doe',
      document: '42201034060',
      email: 'john@doe.com',
      password: '123456789'
    }) 

    expect(user.id).toEqual('user-john@doe.com')
  })

  it('should not be able to register a new user with a already registered email', async () => {
    await registerUseCase.execute({
      firstName: 'John',
      lastName: 'Doe',
      document: '42201034060',
      email: 'john@doe.com',
      password: '123456789'
    }) 

    await expect(registerUseCase.execute({
      firstName: 'John',
      lastName: 'Doe',
      document: '08339145029',
      email: 'john@doe.com',
      password: '123456789'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not be able to register a new user with a already registered document', async () => {
    await registerUseCase.execute({
      firstName: 'John',
      lastName: 'Doe',
      document: '42201034060',
      email: 'john@doe.com',
      password: '123456789'
    }) 

    await expect(registerUseCase.execute({
      firstName: 'John',
      lastName: 'Doe',
      document: '42201034060',
      email: 'johndoe@doe.com',
      password: '123456789'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not be able to register a new user with a invalid email', async () => {
    await expect(registerUseCase.execute({
      firstName: 'John',
      lastName: 'Doe',
      document: '42201034060',
      email: '',
      password: '123456789'
    })).rejects.toBeInstanceOf(InvalidEmailError)
  })

  it('should not be able to register a new user with a invalid document', async () => {
    await expect(registerUseCase.execute({
      firstName: 'John',
      lastName: 'Doe',
      document: '',
      email: 'john@doe.com',
      password: '123456789'
    })).rejects.toBeInstanceOf(InvalidDocumentError)
  })
})