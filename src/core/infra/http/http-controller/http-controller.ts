import HttpServer from '../HttpServer/HttpServer'

export default class HttpController {
  constructor(
    readonly httpServer: HttpServer<unknown>,
  ) {
    httpServer.on('get', '/health-check', async function () {
      return {
        ok: true
      }
    })
  }
}