import * as express from "express";

/* Function for validating schemas */

const SchemaValidator = (schema: any) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.query) {
            let valid = schema(req.query);

            if (valid) {
                next();
            } else {
                res.status(200).json({
                    message: schema.errors,
                    action: false,
                });
            }
        } else {
            res.status(200).json({
                message: "No query parameters",
                action: false,
                required: true,
            });
        }
    };
};

export default SchemaValidator;
