/* PostgreSQL Datasource */

/* Sequilize Object Relational Mapper (ORM) */

import { Sequelize } from "sequelize";
import { postgreSQL } from "../config";

let sequelize: Sequelize;

if (process.env.NODE_ENV === "production") {
    sequelize = new Sequelize(postgreSQL.production.database, postgreSQL.production.username, postgreSQL.production.password, {
        host: postgreSQL.production.host,
        dialect: "postgres",
        protocol: "postgres",
    });
} else {
    sequelize = new Sequelize(postgreSQL.production.database, postgreSQL.production.username, postgreSQL.production.password, {
        host: postgreSQL.production.host,
        dialect: "postgres",
        protocol: "postgres",
    });
}

export default sequelize;
