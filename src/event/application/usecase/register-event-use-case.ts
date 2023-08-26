import UseCase from '@/core/application/usecase/use-case'
import EventsRepository from '../repository/EventsRepository'
import UsersRepository from '@/user/application/repository/UsersRepository'
import { Event } from '@prisma/client'
import { ResourceNotFoundError } from '@/user/infra/errors/resource-not-found'
import { Decimal } from '@prisma/client/runtime/library'
import ValidateDate from '@/event/domain/entities/validate-date'

interface RegisterEventProps {
  creator_id: string;
  title: string;
  description: string;
  date: Date;
  phone_number?: string,
  spots: number,
  latitude:  number,
  longitude: number,
  street: string,  
  number: string,  
  district: string,  
  city: string,  
  state: string,  
  postal_code: string,  
  complement?: string,
}

interface RegisterEventResponse {
  event: Event
}

export default class RegisterEventUseCase implements UseCase {
  constructor(private eventsRepository: EventsRepository, private usersRepository: UsersRepository) {}

  execute = async (data: RegisterEventProps): Promise<RegisterEventResponse> => {
    const { creator_id } = data
    const creator = await this.usersRepository.findById(creator_id)
    if (!creator) throw new ResourceNotFoundError()
    const creatorName = `${creator.firstName} ${creator.lastName}`
  
    new ValidateDate(data.date)

    const event = await this.eventsRepository.create({
      title: data.title,
      description: data.description,
      creator: creatorName,
      phone_number: data?.phone_number || null,
      date: data.date,
      spots: data.spots,
      remaining_spots: (data.spots - 1),
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      street: data.street,
      number: data.number,
      district: data.district,
      city: data.city,
      state: data.state,
      postal_code: data.postal_code,
      complement: data?.complement || null,
    })

    return { event }
  }
}