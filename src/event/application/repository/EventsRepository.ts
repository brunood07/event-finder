import { Event, Prisma } from '@prisma/client'

export default interface EventsRepository {
  create(data: Prisma.EventCreateInput): Promise<Event>;
  findById(id: string): Promise<Event>;
  findByTitle(title: string): Promise<Event>;
  findByDistance(distance: number): Promise<Event>;
}