import { Model } from "sequelize";
import * as md5 from "md5";

/* Parse object */

const ParseObject = (model: Model, column: string) => {
    let result = model.getDataValue(column);

    return JSON.parse(result);
};

/* Stringify query */

const StringifyQuery = (query: object) => {
    let value = JSON.stringify(query).toLowerCase();

    return value;
};

/* Generate MD5 Hash */

const GenerateMD5Hash = (message: string) => {
    return md5(message);
};

export { ParseObject, StringifyQuery, GenerateMD5Hash };
