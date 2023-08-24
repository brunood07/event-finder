import AuthenticateUseCase from '@/user/application/usecase/authenticate-use-case'
import PasswordHash from '@/user/domain/entities/password-hash'
import { InvalidCredentialsError } from '@/user/infra/errors/invalid-credentials'
import InMemoryUsersRepository from '@/user/infra/repository/InMemoryUsersRepository'
import { env } from 'process'
import { beforeEach, describe, expect, it } from 'vitest'

let usersRepository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.register({
      firstName: 'John',
      lastName: 'Doe',
      document: '42201034060',
      email: 'john@doe.com',
      password_hash: (await PasswordHash.create('123456', env.PASSWORD_SALT)).value
    })

    const { user } = await authenticateUseCase.execute({
      email: 'john@doe.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with a wrong email', async () => {
    await usersRepository.register({
      firstName: 'John',
      lastName: 'Doe',
      document: '42201034060',
      email: 'john@doe.com',
      password_hash:(await PasswordHash.create('123456', env.PASSWORD_SALT)).value
    })

    await expect( authenticateUseCase.execute({
      email: 'john@doe2.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with a wrong password', async () => {
    await usersRepository.register({
      firstName: 'John',
      lastName: 'Doe',
      document: '42201034060',
      email: 'john@doe.com',
      password_hash: (await PasswordHash.create('123456', env.PASSWORD_SALT)).value
    })

    await expect( authenticateUseCase.execute({
      email: 'john@doe.com',
      password: '1234567'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})