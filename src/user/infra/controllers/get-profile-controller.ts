import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetProfileteUseCase } from '../factories/make-get-profile-use-case'
import { ResourceNotFoundError } from '../errors/resource-not-found'

export default class GetProfileController {
  handle = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const getProfileUseCase = makeGetProfileteUseCase()
      const profile = await getProfileUseCase.execute({ userId: req.user.sub })

      return reply.status(200).send({
        profile: {
          ...profile
        }
      })
    } catch (err) {
      if(err instanceof ResourceNotFoundError) {
        reply.status(404).send()
      }

      reply.status(400).send()
    }
  }
}