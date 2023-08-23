import 'dotenv/config'
import { FastifyHttpServer } from './core/infra/http/HttpServer/Fastify-http-server'
import { env } from './core/env'
import { usersRoutes } from './user/infra/routes/users-routes'
import HttpController from './core/infra/http/http-controller/http-controller'

async function main() {
  const httpServer = new FastifyHttpServer()
  httpServer.register(usersRoutes)
  new HttpController(httpServer)
  httpServer.listen(env.PORT)
}

main()