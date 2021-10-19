import * as express from "express";
import { Price } from "../models";
import { GetCrytoComparePrice } from "../services/crytocompare";
import { StringifyQuery, ParseObject, GenerateMD5Hash } from "../utils";
import { RedisSetCache } from "../middlewares/redis";
const querystring = require("querystring");

/* Controller for getting prices */

const GetPriceController = async (req: express.Request | any, res: express.Response) => {
    /* Request query parameters */

    let stringifyQuery = StringifyQuery(req.query);
    let url_path = req.url.split("?")[0].replace("/", "");
    let db_query = `${url_path}?${stringifyQuery}`;

    /* Generate MD5 has which will be used as key in the databse */

    let md5hash = GenerateMD5Hash(db_query);

    let prices = await Price.findAll({
        where: {
            query: md5hash,
        },
        attributes: {
            exclude: ["created_at", "updated_at"],
        },
    });

    if (prices.length !== 0) {
        /* Saving data into redis cache */

        RedisSetCache(md5hash, ParseObject(prices[0], "data"));

        res.status(200).json({
            data: ParseObject(prices[0], "data"),
        });
    } else {
        try {
            let query = querystring.stringify(req.query);

            /* Request to cryptocompare API to get data */

            let responseData = await GetCrytoComparePrice(url_path, query);

            /* Checking for error messages */

            if (responseData.data["Response"] === "Error" || responseData.data["HasWarning"] === false) {
                /* Response with error message */

                res.status(200).json({
                    error: responseData.data,
                });
            } else {
                if (responseData.status === 200) {
                    /* Saving data into postgres database */

                    let price = await Price.create({
                        query: md5hash,
                        data: JSON.stringify(responseData.data),
                    });

                    /* Saving data into redis cache */

                    RedisSetCache(md5hash, ParseObject(price, "data"));

                    /* Response with data */

                    res.status(200).json({
                        data: responseData.data,
                    });
                } else {
                    /* Response with error message */

                    res.status(200).json({
                        error: responseData.data,
                    });
                }
            }
        } catch (error) {
            /* Response with error message */

            res.status(200).json({
                error,
            });
        }
    }
};

export { GetPriceController };
