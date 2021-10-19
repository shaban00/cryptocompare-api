import * as express from "express";
import { redisCache } from "../datasources";
import { StringifyQuery, GenerateMD5Hash } from "../utils";

/* Function for adding data into redis cache */

const RedisSetCache = (key: string, data: object | string) => {
    if (key) {
        if (typeof data === "object") {
            redisCache.setex(key, 1800, JSON.stringify(data));
        } else if (typeof data === "string") {
            redisCache.setex(key, 1800, data);
        }
    }
};

/* Function for getting data from redis cache */

const RedisGetCache = () => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        let stringifyQuery = StringifyQuery(req.query);
        let url_path = req.url.split("?")[0].replace("/", "");
        let db_query = `${url_path}?${stringifyQuery}`;

        let md5hash = GenerateMD5Hash(db_query);

        if (md5hash) {
            redisCache.get(md5hash, (_, reply) => {
                if (reply) {
                    res.status(200).json({
                        data: JSON.parse(reply),
                    });
                } else {
                    next();
                }
            });
        }
    };
};

export { RedisSetCache, RedisGetCache };
