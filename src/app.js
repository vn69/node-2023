import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./config/database.js";
import cors from "cors";

import authRouter from "./routers/auth.js";
import usersRouter from "./routers/user.js";
// import productsRouter from "./routers/product.js";

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.static("src/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect db
connectDB();

const port = process.env.PORT || 3000;

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", usersRouter);
// app.use("/api/v1/product", productsRouter);
app.use((req, res) => res.status(404).send("404 not found"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
