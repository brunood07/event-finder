import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUseCase } from '../factories/make-authenticate-use-case'
import { InvalidCredentialsError } from '../errors/invalid-credentials'
import { env } from '@/core/env'

export default class AuthenticateController {
  handle = async (req: FastifyRequest, reply: FastifyReply) => {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string()
    })

    const data = authenticateBodySchema.parse(req.body)

    try {
      const authenticateUseCase = makeAuthenticateUseCase()
      const { user } = await authenticateUseCase.execute(data)

      const token = await reply.jwtSign({}, {
        sign: {
          sub: user.id
        }
      })

      const refreshToken = await reply.jwtSign({}, {
        sign: {
          sub: user.id,
          expiresIn: env.JWT_REFRESH_TOKEN_EXPIRES_IN
        }
      })

      return reply.status(200).setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true
      }).send({ token })
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        return reply.status(400).send({ message: err.message })
      }

      reply.status(400).send()
    }
  }
}