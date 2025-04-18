import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { errorMiddleware } from '../utils/errorhandlers/errors.middlewares';

const errorMiddlewarePlugin = fp(async (fastify: FastifyInstance, options) => {
    fastify.addHook('onError', async (req, reply) => {
        fastify.setErrorHandler(function (error, request, reply) {
            errorMiddleware(error, req, reply);
            reply.status(409).send({ ok: false })
        })
    })


}
    , {
        name: 'middleware'
    });

export default errorMiddlewarePlugin;
