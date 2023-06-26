import "reflect-metadata";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import logger from "morgan";
import { ERR } from "./middleware/midError";
import { playRt } from "./routes/playRt";
import { dBase } from "./DataSource";

(async () => {
    await dBase.initialize()
    .then(() => console.log("PostgreSQL is nowConnected!"))
    .catch((error) => console.log(error));
    const app: express.Application = express();
    app.use(helmet());

    // CORS
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", 
            "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", 
                "POST, GET, PUT, PATCH, DELETE");
            return res.status(200).json({"status message": "OK"});
        };
        next();
    });

    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(logger("dev"));
    app.use("/", playRt);
    app.use(ERR.errorHandler);
    app.use(ERR.notFound);
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Server: http://localhost:${port}`);
        console.log("Press Ctrl + C to exit.");
    })
})();



