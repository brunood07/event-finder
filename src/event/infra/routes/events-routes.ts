import { FastifyInstance } from 'fastify'
import RegisterEventController from '../controllers/register-event-controller'
import { verifyJWT } from '@/core/infra/http/middlewares/verify-jwt'

export async function eventsRoutes(app: FastifyInstance) {
  const registerEvent = new RegisterEventController()

  app.post('/events', { onRequest: [verifyJWT] }, registerEvent.handle)
}
