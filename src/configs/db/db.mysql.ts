// import fastifyMysql from "@fastify/mysql"
// import { envConfig } from "../constants/env.config"
// import type { FastifyInstance } from "fastify"

// export const dbOptions = {
//     // connectionString: 'mysql://user:password@localhost/database_name',
//     host: envConfig.DB_HOST,
//     user: envConfig.DB_USERNAME,
//     password: envConfig.DB_PASSWORD,
//     database: envConfig.DB_NAME,
//     name: "app",
//     promise: true,
// }

// export const database_connect = async (app: FastifyInstance) => {
//     await app.register(fastifyMysql, dbOptions);
//     app.ready((err) => {
//         if (err) {
//             console.error('Error connecting to the databases:', err);
//             process.exit(1);
//         }
//         console.log('Successfully connected to the mysql database');
//     });
// };
