import { FastifyPluginCallback, FastifyRegisterOptions } from 'fastify'

export default interface HttpServer<RouteHandlerMethod> {
  register(plugin: FastifyPluginCallback, opts?: FastifyRegisterOptions<unknown>): void;
  on(method: string, url: string, handler: RouteHandlerMethod): Promise<void>;
  listen (port: number): Promise<void>;
}