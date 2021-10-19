import * as express from "express";
import { GetPriceController } from "../controllers/pricing";
import SchemaValidator from "../middlewares/schema_validator";
import { pricingValidate } from "../schemas/pricing";
import urls from "../constants/urls";
import { RedisGetCache } from "../middlewares/redis";

/* Pricing urls */

const pricing_urls = urls.pricing;

/* Express router */

const router: express.Router = express.Router();

/* Route for getting Single Symbol Price */

router.get(pricing_urls.price, SchemaValidator(pricingValidate), RedisGetCache(), (req: express.Request, res: express.Response) => {
    GetPriceController(req, res);
});

/* Route for getting Multi Symbols Price */

router.get(pricing_urls.pricemulti, SchemaValidator(pricingValidate), RedisGetCache(), (req: express.Request, res: express.Response) => {
    GetPriceController(req, res);
});

/* Route for getting Multi Symbols Full Data */

router.get(pricing_urls.pricemultifull, SchemaValidator(pricingValidate), RedisGetCache(), (req: express.Request, res: express.Response) => {
    GetPriceController(req, res);
});

export default router;
