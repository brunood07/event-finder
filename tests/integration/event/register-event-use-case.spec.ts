import { env } from '@/core/env'
import RegisterEventUseCase from '@/event/application/usecase/register-event-use-case'
import { InvalidDateError } from '@/event/infra/errors/invalid-date'
import InMemoryEventsRepository from '@/event/infra/repository/InMemoryEventsRepository'
import PasswordHash from '@/user/domain/entities/password-hash'
import { ResourceNotFoundError } from '@/user/infra/errors/resource-not-found'
import InMemoryUsersRepository from '@/user/infra/repository/InMemoryUsersRepository'
import { beforeAll, describe, it, expect } from 'vitest'

let usersRepository: InMemoryUsersRepository
let eventsRepository: InMemoryEventsRepository
let registerEventUseCase: RegisterEventUseCase

describe('Register Event', () => {
  beforeAll(() => {
    usersRepository = new InMemoryUsersRepository()
    eventsRepository = new InMemoryEventsRepository()
    registerEventUseCase = new RegisterEventUseCase(eventsRepository, usersRepository)
  })

  it('should be able to register a event', async () => {
    const user = await usersRepository.register({
      firstName: 'John',
      lastName: 'Doe',
      document: '42201034060',
      email: 'john@doe.com',
      password_hash: (await PasswordHash.create('123456', env.PASSWORD_SALT)).value
    })

    const { event } = await registerEventUseCase.execute({
      title: 'Typescript Confference',
      description: 'Confference for people who loves typescript',
      creator_id: user.id,
      date: new Date('2023-08-31T13:00:00.143Z'),
      phone_number: '11999999999',
      spots: 100,
      latitude:  -23.583083,
      longitude: -46.572109,
      street: 'Av. Professor Luiz Ignácio Anhaia Mello',  
      number: '2230',  
      district: 'Jardim Avelino',  
      city: 'São Paulo',  
      state: 'SP',  
      postal_code: '03294000',  
    })

    expect(event.id).toEqual('event-Typescript Confference')
  })

  it('should not be able to register a event with an old date', async () => {
    const user = await usersRepository.register({
      firstName: 'John',
      lastName: 'Doe',
      document: '42201034060',
      email: 'john@doe.com',
      password_hash: (await PasswordHash.create('123456', env.PASSWORD_SALT)).value
    })

    await expect(registerEventUseCase.execute({
      creator_id: user.id,
      title: '',
      description: '',
      date: new Date('2023-08-20T13:00:00.143Z'),
      phone_number: '11999999999',
      spots: 100,
      latitude:  -23.583083,
      longitude: -46.572109,
      street: 'Av. Professor Luiz Ignácio Anhaia Mello',  
      number: '2230',  
      district: 'Jardim Avelino',  
      city: 'São Paulo',  
      state: 'SP',  
      postal_code: '03294000',  
    })).rejects.toBeInstanceOf(InvalidDateError)
  })

  it('should not be able to register a event with an invalid creator', async () => {
    await expect(registerEventUseCase.execute({
      creator_id: 'not-found',
      title: '',
      description: '',
      date: new Date('2023-08-31T13:00:00.143Z'),
      phone_number: '11999999999',
      spots: 100,
      latitude:  -23.583083,
      longitude: -46.572109,
      street: 'Av. Professor Luiz Ignácio Anhaia Mello',  
      number: '2230',  
      district: 'Jardim Avelino',  
      city: 'São Paulo',  
      state: 'SP',  
      postal_code: '03294000',  
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})