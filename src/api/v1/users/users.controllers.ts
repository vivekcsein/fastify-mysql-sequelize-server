import type { FastifyRequest, FastifyReply, FastifyInstance, DoneFuncWithErrOrRes } from 'fastify';
// import fastifyMysql from '@fastify/mysql';
import * as dbQuery from "./users.dbquery"
import dbPlugin from '../../../configs/db/db.plugin';
import type { Iuser } from '../../../types/user';

export const getAllUsers = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        //database get all users*

    } catch (err) {
        return reply.code(500).send({ error: err })
    }
};

export const getSingleUserbyID = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        if (!dbPlugin) {
            return { message: 'sequelize plugin not registered' }
        }
        const { id } = req.params as { id: number };
        //get a user information from mysql database
        const currentUser = dbQuery.DB_getUser(id);
        return currentUser;

    } catch (err) {
        return reply.code(500).send({ error: err })
    }
};

export const postCreateUser = async (req: FastifyRequest, reply: FastifyReply,) => {
    try {
        const { name, email } = req.body as Iuser;
        const { password } = req.body as { password: string };
        const hashedPasswordGenerated = password;
        const newUser = { id: 0, name: name, email: email, hashedPassword: hashedPasswordGenerated };
        const res = await dbQuery.DB_createUser(newUser);
        reply.send(res);
    } catch (err) {
        return reply.code(500).send({ error: err })
    }
};

export const putUpdateUser = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = req.params as { id: number };
        const { name, email } = req.body as Iuser;
        const updatedUser = { id: id, name: name ? name : "", email: email ? email : "" };
        //user update
        const res = await dbQuery.DB_updateUser(updatedUser);
        reply.send(res);

    } catch (err) {
        return reply.code(500).send({ error: err })
    }
};

export const deleteUser = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        //locally delete a user
        const params = req.params as { id: string };
        const id = parseInt(params.id, 10);
        // const res = dbQuery.deleteUser(id);
        // return res;

    } catch (err) {
        return reply.code(500).send({ error: err })
    }
};