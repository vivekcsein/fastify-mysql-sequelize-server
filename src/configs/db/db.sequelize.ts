import { Sequelize } from "sequelize";
import { envConfig, envMysqlDB } from "../constants/env.config";
// import type { FastifyInstance } from "fastify";

const sequelize = new Sequelize({
    database: envMysqlDB.DB_NAME,
    username: envMysqlDB.DB_USERNAME,
    password: envMysqlDB.DB_PASSWORD,
    host: envMysqlDB.DB_HOST,
    dialect: "mysql", // or 'mariadb' if using MariaDB
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});


export const database_connect = async () => {
    try {
        // Test connection
        await sequelize.authenticate();
        console.log('Successfully connected to the mysql database');
        // Sync models with the database (optional, but recommended)
        await sequelize.sync({ force: false }); // Set force: true to drop and recreate tables
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        process.exit(1);
    }
};

export default sequelize;