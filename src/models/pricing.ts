/* Sequelize Model */

import { Model, DataTypes } from "sequelize";
import { postgres } from "../datasources";

/* Price model interface */

interface PriceModel extends Model {
    query: string;
    data: string;
}

/* Price model */

const Price = postgres.define<PriceModel>(
    "prices",
    {
        query: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: false,
        },
        data: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        underscored: true,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default Price;
