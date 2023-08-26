import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterEventUseCase } from '../factories/make-register-event'
import { InvalidDateError } from '../errors/invalid-date'
import { ResourceNotFoundError } from '@/user/infra/errors/resource-not-found'

export default class RegisterEventController {
  handle = async (req: FastifyRequest, reply: FastifyReply) => {
    const registerEventBodySchema = z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      phone_number: z.string().optional(),
      spots: z.number(),
      latitude:  z.number(),
      longitude: z.number(),
      street: z.string(),
      number: z.string(),
      district: z.string(),
      city: z.string(),
      state: z.string(),
      postal_code: z.string(),
      complement: z.string().optional(),
    })

    const bodyData = registerEventBodySchema.parse(req.body)
    const creator_id = req.user.sub
    
    try {
      const data = {
        ...bodyData,
        creator_id
      }

      const registerEventUsecase = makeRegisterEventUseCase()
      const response = await registerEventUsecase.execute(data)

      return reply.status(201).send(response)
    } catch (err) {
      if (err instanceof InvalidDateError) {  
        return reply.status(400).send(err.message)
      }

      if (err instanceof ResourceNotFoundError) {
        return reply.status(400).send(err.message)
      }

      return reply.status(400).send()
    }
  }
}