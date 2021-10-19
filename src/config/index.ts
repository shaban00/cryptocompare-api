/* Load environment variables */

import * as dotenv from "dotenv";
dotenv.config();

/* PostgresSQL Database Connections */

const dbName = process.env.DATABASE_NAME as string;
const dbUser = process.env.DATABASE_USERNAME as string;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbHost = process.env.DATABASE_HOST;

const postgreSQL = {
    development: {
        database: dbName,
        username: dbUser,
        password: dbPassword,
        host: dbHost,
    },
    staging: {
        database: dbName,
        username: dbUser,
        password: dbPassword,
        host: dbHost,
    },
    production: {
        database: dbName,
        username: dbUser,
        password: dbPassword,
        host: dbHost,
    },
};

/* Redis Connections */

const redisConfig = {
    development: {
        host: process.env.REDIS_HOST,
    },
    staging: {
        host: process.env.REDIS_HOST,
    },
    production: {
        host: process.env.REDIS_HOST,
    },
};

/* API Versioning */

const apiversion = "/api/v1";

export { postgreSQL, redisConfig, apiversion };
