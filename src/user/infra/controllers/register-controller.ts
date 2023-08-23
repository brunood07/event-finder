import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterUserUseCase } from '../factories/make-register-user-use-case'
import { UserAlreadyExistsError } from '../errors/user-already-exists'
import { InvalidEmailError } from '../errors/invalid-email'
import { InvalidDocumentError } from '../errors/invalid-document'


export default class RegisterController {
  handle = async (req: FastifyRequest, reply: FastifyReply) => {
    const registerUserBodySchema = z.object({
      firstName: z.string().min(3),
      lastName: z.string().min(3),
      document: z.string(),
      email: z.string().email(),
      password: z.string().min(6)
    })

    const data = registerUserBodySchema.parse(req.body)
    try {
      const registerUseCase = makeRegisterUserUseCase()
      await registerUseCase.execute(data)

      return reply.status(201).send()
    } catch (err) {
      if (err instanceof UserAlreadyExistsError || err instanceof InvalidDocumentError || err instanceof InvalidEmailError) {
        reply.status(400).send(err.message)
      }

      reply.status(400).send()
    }
  }
}