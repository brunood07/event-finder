import { env } from '@/core/env'
import GetProfileUseCase from '@/user/application/usecase/get-profile-use-case'
import PasswordHash from '@/user/domain/entities/password-hash'
import InMemoryUsersRepository from '@/user/infra/repository/InMemoryUsersRepository'
import { beforeEach, describe, it, expect } from 'vitest'

let usersRepository: InMemoryUsersRepository
let getProfileUseCase: GetProfileUseCase

describe('Get Profile', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    getProfileUseCase = new GetProfileUseCase(usersRepository)
  })

  it('should be able to get profile by id', async () => {
    const createdUser = await usersRepository.register({
      firstName: 'John',
      lastName: 'Doe',
      document: '42201034060',
      email: 'john@doe.com',
      password_hash: (await PasswordHash.create('123456', env.PASSWORD_SALT)).value
    })
    
    const { user } = await getProfileUseCase.execute({ userId: createdUser.id })

    expect(user.firstName).toEqual('John')
    expect(user.lastName).toEqual('Doe')
    expect(user.document).toEqual('42201034060')
    expect(user.email).toEqual('john@doe.com')
  })
})