import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express from 'express'
import bodyParser from "body-parser";
import {connectDB} from './config/database.js'

import usersRouter from './routers/user.js'
import productsRouter from './routers/product.js'
import auth from './helper/auth.js';

const app = express()
app.use(express.static('src/public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// connect db
connectDB()


const port = process.env.PORT || 3000

app.use(auth.checkToken)

app.use('/api/v1/user', usersRouter)
app.use('/api/v1/product', productsRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})