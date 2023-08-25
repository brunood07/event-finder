import { FastifyInstance } from 'fastify'
import RegisterController from '../controllers/register-controller'
import AuthenticateController from '../controllers/authenticate-controller'
import RefreshController from '../controllers/refresh-controller'
import GetProfileController from '../controllers/get-profile-controller'
import { verifyJWT } from '@/core/infra/http/middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) { 
  const register = new RegisterController()
  const authenticate = new AuthenticateController()
  const refresh = new RefreshController()
  const getProfile = new GetProfileController()

  app.post('/users', register.handle)
  app.post('/session', authenticate.handle)
  app.post('/session/refresh', refresh.handle)

  // Authenticated Routes
  app.get('/me', { onRequest: [verifyJWT] }, getProfile.handle)
}