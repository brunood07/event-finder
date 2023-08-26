import EventsRepository from '@/event/application/repository/EventsRepository'
import { Event, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export default class InMemoryEventsRepository implements EventsRepository {
  public events: Event[] = []

  async create(data: Prisma.EventCreateInput): Promise<Event> {
    const event = {
      id: `event-${data.title}`,
      title: data.title,
      description: data.description,
      creator: data.creator,
      date: new Date('2023-08-31T13:00:00.143Z'),
      phone_number: data.phone_number || null,
      spots: data.spots,
      remaining_spots: data.remaining_spots,
      latitude:  new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      street: data.street,  
      number: data.number,  
      district: data.description,  
      city: data.city,  
      state: data.state,  
      postal_code: data.postal_code,  
      complement: data.complement || null,
      created_at: new Date()
    }

    this.events.push(event)

    return event
  }

  async findById(id: string): Promise<Event> {
    throw new Error('Method not implemented.')
  }
  async findByTitle(title: string): Promise<Event> {
    throw new Error('Method not implemented.')
  }
  async findByDistance(distance: number): Promise<Event> {
    throw new Error('Method not implemented.')
  }
}