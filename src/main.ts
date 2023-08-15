import 'dotenv/config'
import { FastifyHttpServer } from './core/infra/http/HttpServer/Fastify-http-server'
import { env } from './core/env'
import { HttpController } from './core/infra/http/HttpController'

async function main() {
  const httpServer = new FastifyHttpServer()
  new HttpController(httpServer)
  httpServer.listen(env.PORT)
}

main()