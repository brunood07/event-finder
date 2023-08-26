import PrismaUsersRepository from '@/user/infra/repository/PrismaUsersRepository'
import PrismaEventsRepository from '../repository/PrismaEventsRepository'
import RegisterEventUseCase from '@/event/application/usecase/register-event-use-case'

export function makeRegisterEventUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const eventsRepository = new PrismaEventsRepository()
  const registerEventUseCase = new RegisterEventUseCase(eventsRepository, usersRepository)

  return registerEventUseCase
}