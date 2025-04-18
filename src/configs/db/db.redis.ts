import Redis from "ioredis"
import { envRedisDB } from "../constants/env.config"

const redis = new Redis({
    host: envRedisDB.DB_HOST,
    port: Number(envRedisDB.DB_PORT),
    password: envRedisDB.DB_PASSWORD,
})

export default redis;