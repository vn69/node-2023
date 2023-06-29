import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./config/database.js";
import cors from "cors";
import helmet from 'helmet';
import rateLimiter from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
// import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger_output.json' assert { type: "json" };



import authRouter from "./routers/auth.js";
import usersRouter from "./routers/user.js";
import productsRouter from "./routers/product.js";

const app = express();

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes limit 200 request per ip address
    max: 200,
  })
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(helmet()); // secure your Express apps by setting various HTTP headers
app.use(cors({ credentials: true, origin: true }));
app.use(mongoSanitize()); // prevent MongoDB Operator Injection.
app.use(express.static("src/public"));
app.use(bodyParser.json());

// connect db
connectDB();

const port = process.env.PORT || 3000;

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", usersRouter);
app.use("/api/v1/product", productsRouter);
app.use((req, res) => res.status(404).send("404 not found"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
