import 'dotenv/config'
import { FastifyHttpServer } from './core/infra/http/HttpServer/Fastify-http-server'
import { env } from './core/env'

async function main() {
  const httpServer = new FastifyHttpServer()
  httpServer.listen(env.PORT)
}

main()