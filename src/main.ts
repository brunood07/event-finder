import 'dotenv/config'
import { FastifyHttpServer } from './core/infra/http/HttpServer/Fastify-http-server'
import { env } from './core/env'
import { UsersRoutes } from './user/infra/routes/user-routes'

async function main() {
  const httpServer = new FastifyHttpServer()
  httpServer.register(UsersRoutes)
  httpServer.listen(env.PORT)
}

main()