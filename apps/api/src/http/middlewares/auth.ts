import type { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

import { UnauthorizedError } from '../routes/_errors/unauthorized-error'

/**
 * Com a adição do Fastify Plugin, eu consigo usar esse Hook em toda a aplicação
 * fazendo o registro dela na rota que vou utilizar
 */
export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()

        return sub
      } catch {
        throw new UnauthorizedError('Invalid auth token.')
      }
    }
  })
})
