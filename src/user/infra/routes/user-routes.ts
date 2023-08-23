import { FastifyInstance } from 'fastify'
import RegisterController from '../controllers/register-controller'

export async function UsersRoutes(app: FastifyInstance) { 
  const register = new RegisterController()
  
  app.post('/users', register.handle)
}