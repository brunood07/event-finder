import { env } from '@/core/env'
import { FastifyReply, FastifyRequest } from 'fastify'

export default class RefreshController {
  handle = async (req: FastifyRequest, reply: FastifyReply) => {
    await req.jwtVerify({ onlyCookie: true })
    const token = await reply.jwtSign({}, 
      {
        sign: {
          sub: req.user.sub
        }
      }
    )

    const refreshToken = await reply.jwtSign({}, 
      {
        sign: {
          sub: req.user.sub,
          expiresIn: env.JWT_REFRESH_TOKEN_EXPIRES_IN
        }
      }
    )

    return reply.status(200).setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true
    }). send({ token })
  }
}