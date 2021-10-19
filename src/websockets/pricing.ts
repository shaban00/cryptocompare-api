import { Socket } from "socket.io";
import { GetCrytoComparePrice } from "../services/crytocompare";
import { StringifyQuery, ParseObject, GenerateMD5Hash } from "../utils";
import { redisCache } from "../datasources";
import { Price } from "../models";
import { RedisSetCache } from "../middlewares/redis";
const querystring = require("querystring");

/* Function for getting pricing using socket */

const GetPricingSocket = async (socket: Socket) => {
    /* Socket query parameters */

    let socketQuery = socket.handshake.query;

    if (socketQuery) {
        let url_path: string | any = socketQuery.url_path;

        /* Delete irrelevant query parameters */

        delete socketQuery["EIO"];
        delete socketQuery["transport"];
        delete socketQuery["url_path"];

        /* Stringify query parameters */

        let stringifyQuery = StringifyQuery(socketQuery);
        let db_query = `${url_path}?${stringifyQuery}`;

        /* Generate MD5 has which will be used as key in the databse */

        let md5hash = GenerateMD5Hash(db_query);

        /* Getting data from redis */

        redisCache.get(md5hash, async (_, reply) => {
            if (reply) {
                let response = JSON.parse(reply);

                socket.emit(md5hash, {
                    data: response,
                });
            } else {
                try {
                    /* If no data is available in redis check database if data is available in the database */

                    let prices = await Price.findAll({
                        where: {
                            query: md5hash,
                        },
                        attributes: {
                            exclude: ["created_at", "updated_at"],
                        },
                    });

                    if (prices.length !== 0) {
                        socket.emit(md5hash, {
                            data: ParseObject(prices[0], "data"),
                        });
                    } else {
                        try {
                            /* If no data is available in database, make a requests to cryptocompare API to get data */

                            let query = querystring.stringify(socketQuery);

                            let responseData = await GetCrytoComparePrice(url_path, query);

                            if (responseData.data["Response"] === "Error" || responseData.data["HasWarning"] === false) {
                                socket.emit(md5hash, {
                                    error: responseData.data,
                                });
                            } else {
                                /* Saving data into postgres database */

                                let price = await Price.create({
                                    query: stringifyQuery,
                                    data: JSON.stringify(responseData.data),
                                });

                                /* Saving data into redis cache */

                                RedisSetCache(md5hash, ParseObject(price, "data"));

                                /* Socket emit data */

                                socket.emit(md5hash, {
                                    data: ParseObject(price, "data"),
                                });
                            }
                        } catch (error) {
                            /* Socket emit error message */

                            socket.emit(md5hash, {
                                error: error.message,
                            });
                        }
                    }
                } catch (error) {
                    /* Socket emit error message */

                    socket.emit(md5hash, {
                        error: error.message,
                    });
                }
            }
        });
    }
};

export { GetPricingSocket };
