// plugins/db.js
import fp from 'fastify-plugin';
import sequelize, { database_connect } from './db.sequelize'; // Import your Sequelize instance
import type { FastifyInstance } from "fastify"
import UserModel from "../../api/v1/users/users.models"

// Make Sequelize instance accessible to all routes and handlers
const dbPlugin = async (fastify: FastifyInstance) => {
    database_connect();
    fastify.decorate('sequelize', sequelize);
    fastify.decorate('User', UserModel); // Make model accessible

    // Optional: Define custom database query functions here if needed
    // fastify.decorate('db', {
    //     // ... your custom query functions

    // });
};

export default fp(dbPlugin, {
    name: 'db',
});