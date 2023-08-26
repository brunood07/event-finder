import { prisma } from '@/core/database/prisma'
import EventsRepository from '@/event/application/repository/EventsRepository'
import { Event, Prisma } from '@prisma/client'

export default class PrismaEventsRepository implements EventsRepository {
  async create(data: Prisma.EventCreateInput): Promise<Event> {
    const event = await prisma.event.create({
      data
    })

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