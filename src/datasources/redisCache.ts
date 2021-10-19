/* Redis Datasource */

import * as redis from "redis";
import { redisConfig } from "../config";

let client: redis.RedisClient;

if (process.env.NODE_ENV === "production") {
    client = redis.createClient({
        host: redisConfig.production.host,
    });
} else {
    client = redis.createClient({
        host: redisConfig.development.host,
    });
}

export default client;
