import { FastifyInstance } from 'fastify'
import RegisterController from '../controllers/register-controller'
import AuthenticateController from '../controllers/authenticate-controller'
import RefreshController from '../controllers/refresh-controller'

export async function usersRoutes(app: FastifyInstance) { 
  const register = new RegisterController()
  const authenticate = new AuthenticateController()
  const refresh = new RefreshController()

  app.post('/users', register.handle)
  app.post('/session', authenticate.handle)
  app.post('/session/refresh', refresh.handle)
}