import 'dotenv/config'
import { FastifyHttpServer } from './core/infra/http/HttpServer/Fastify-http-server'
import { env } from './core/env'
import { usersRoutes } from './user/infra/routes/users-routes'
import { eventsRoutes } from './event/infra/routes/events-routes'
import HttpController from './core/infra/http/http-controller/http-controller'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

async function main() {
  const httpServer = new FastifyHttpServer()
  httpServer.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
      cookieName: 'refreshToken',
      signed: false,
    },
    sign: {
      expiresIn: env.JWT_TOKEN_EXPIRES_IN,
    },
  })
  httpServer.register(fastifyCookie)
  httpServer.register(usersRoutes)
  httpServer.register(eventsRoutes)
  new HttpController(httpServer)
  httpServer.listen(env.PORT)
}

main()