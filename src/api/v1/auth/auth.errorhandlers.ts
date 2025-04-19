import type { FastifyReply, FastifyRequest } from "fastify";
import { ValidationError } from "sequelize";
import { RedisDBError } from "../../../configs/utils/errorhandlers/errors.handler";


export const errUserRegistration = (err: Error, _req: FastifyRequest, reply: FastifyReply) => {
    if (err instanceof ValidationError && err.message) {
        reply.
            send({ message: err.message })
    }
    if (err instanceof RedisDBError && err.message) {
        reply.
            send({ message: err.message })
    }
    else {
        reply.
            send({ message: err.message })
    }
}