
import { AppError } from "./errors.handler";
import type { FastifyReply, FastifyRequest } from "fastify";

export const errorMiddleware = (err: Error, req: FastifyRequest, reply: FastifyReply) => {
    if (err instanceof AppError) {
        console.log(`Error ${req.method} ${req.url} - ${err.message}`);
        if (!err.statusCode) return;
        return reply.status(err.statusCode)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({
                status: "error",
                message: err.message,
                ...(err.details && { details: err.details }),
            });
        console.log("unhandled error:", err);
        return reply.status(500)
            .header('Content-Type', 'application/json; charset=utf-8').
            send({
                err: "something went wrong, please try again"
            })
    }
}