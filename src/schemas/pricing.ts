/* Ajv for schema validation */

import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

/* Schema props */

interface SchemaProps {
    tryConversion?: boolean | undefined;
    fsym?: string;
    fsyms?: string;
    tsyms: string;
    relaxedValidation?: boolean | undefined;
    e?: string;
    extraParams?: string;
    sign?: boolean | undefined;
}

/* Schema */

const schema: JSONSchemaType<SchemaProps> = {
    type: "object",
    properties: {
        tryConversion: {
            type: "boolean",
            nullable: true,
        },
        fsym: {
            type: "string",
            nullable: true,
        },
        fsyms: {
            type: "string",
            nullable: true,
        },
        tsyms: {
            type: "string",
        },
        relaxedValidation: {
            type: "boolean",
            nullable: true,
        },
        e: {
            type: "string",
            nullable: true,
        },
        extraParams: {
            type: "string",
            nullable: true,
        },
        sign: {
            type: "boolean",
            nullable: true,
        },
    },
    required: ["tsyms"],
    additionalProperties: true,
};

/* Compiling schema */

const pricingValidate = ajv.compile(schema);

export { pricingValidate };
