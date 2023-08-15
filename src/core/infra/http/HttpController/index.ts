import HttpServer from '../HttpServer/HttpServer'

export class HttpController {
  constructor(
    private httpServer: HttpServer<unknown>
  ) {
    this.httpServer.on('post', '/users', async () => {
      console.log('user created')
    })
  }
}