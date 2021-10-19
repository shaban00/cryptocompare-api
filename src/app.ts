import * as express from "express";
import * as helmet from "helmet";
import * as cors from "cors";
import * as http from "http";
import { Server, Socket } from "socket.io";

/* Express Application */

const app: express.Application = express();

/* Express server PORT */

const PORT: number = 4000;

/* Express enable JSON body parser */

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

/* CORS (Cross-Origin Resource Sharing) middlware*/

app.use(cors());

/* Helmet (Helmet helps you secure your Express apps by setting various HTTP headers) */

app.use(helmet.hidePoweredBy());

/* Helmet disable x-powered-by */

app.disable("x-powered-by");

/* API Version */

import { apiversion } from "./config";

/* Application routes */

import pricing_routes from "./routes/pricing";

/* Sockets */

import { GetPricingSocket } from "./websockets/pricing";

/* HTTP Server */

const httpServer: http.Server = http.createServer(app);

/* Socket connection */

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET"],
        allowedHeaders: ["Authorization"],
    },
});

io.on("connection", (socket: Socket) => {
    GetPricingSocket(socket);
});

/* Use application routes */

app.use(apiversion, pricing_routes);

/* Invalid routes */

app.all("/*", (req: express.Request, res: express.Response) => {
    res.status(200).json({
        message: "This is an API not a website 💥💥💥",
        request_method: `${req.method}`,
        error: "Invalid url",
    });
});

/* Start Express Server */

httpServer.listen(
    {
        port: process.env.PORT || PORT,
    },
    () => {
        console.log(`🚀🚀🚀 Server ready at http://localhost:${PORT}`);
    }
);
