import type { FastifyReply, FastifyRequest } from "fastify";
import { ValidationError } from "sequelize";


export const errSingleUserbyID = (err: Error, req: FastifyRequest, reply: FastifyReply) => {

}

export const errCreateUser = (err: Error, _req: FastifyRequest, reply: FastifyReply) => {
    if (err instanceof ValidationError && err.message) {
        reply.
            send({ message: err.message })
    }
    else {
        reply.
            send({ message: err.message })
    }
}

export const errUpdateUser = (err: Error, req: FastifyRequest, reply: FastifyReply) => {

}

export const errDeleteUser = (err: Error, req: FastifyRequest, reply: FastifyReply) => {

}