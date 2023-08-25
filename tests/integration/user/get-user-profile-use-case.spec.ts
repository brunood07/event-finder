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
    const user = await usersRepository.register({
      firstName: 'John',
      lastName: 'Doe',
      document: '42201034060',
      email: 'john@doe.com',
      password_hash: (await PasswordHash.create('123456', env.PASSWORD_SALT)).value
    })
    
    const { user: userProfile } = await getProfileUseCase.execute({ userId: user.id })

    expect(userProfile.firstName).toEqual('John')
    expect(userProfile.lastName).toEqual('Doe')
    expect(userProfile.document).toEqual('42201034060')
    expect(userProfile.email).toEqual('john@doe.com')
  })
})