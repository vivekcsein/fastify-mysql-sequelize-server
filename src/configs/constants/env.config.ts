import * as dotenv from "dotenv";
dotenv.config();

const _envConfig = {
  //development or build configs
  NODE_ENV: process.env.NODE_ENV || ("development" as string),

  //server env configs
  SERVER_PORT: parseInt(process.env.SERVER_PORT as string, 10) | 7164,

  //database env configs
  DB_PORT: parseInt(process.env.SERVER_PORT as string, 10) | (3306 as number),
  DB_URL: process.env.DB_URL as string,
  DB_HOST: process.env.DB_HOST as string,
  DB_USERNAME: process.env.DB_USERNAME as string,
  DB_PASSWORD: process.env.DB_PASSWORD as string,
  DB_NAME: process.env.DB_NAME as string,

  //api routes or path
  API_PATH: process.env.API_PATH as string,
};

const _envDB = {
  //database env configs
  DB_PORT: parseInt(process.env.SERVER_PORT as string, 10) | (3306 as number),
  DB_URL: process.env.DB_URL as string,
  DB_HOST: process.env.DB_HOST as string,
  DB_USERNAME: process.env.DB_USERNAME as string,
  DB_PASSWORD: process.env.DB_PASSWORD as string,
  DB_NAME: process.env.DB_NAME as string,
};

export const envConfig = Object.freeze(_envConfig);
export const envDB = Object.freeze(_envDB);
