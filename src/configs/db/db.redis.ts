
import { Redis } from "@upstash/redis";
import { envRedisDB } from "../constants/env.config"

const redis = new Redis({
    url: envRedisDB.DB_URL,
    token: envRedisDB.DB_TOKEN,
})

export const redisDB_connect = async () => {
    try {
        const pingCommandResult = await redis.ping();
        console.log("redis data base is ready to " + pingCommandResult);

    } catch (error) {
        throw new Error('Unhandled Redis error');
    }
}

export default redis;