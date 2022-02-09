import express from 'express';
import checkIfAuthenticated from './api/middleware/checkIfAuthenticated';
import getAuthToken from './api/middleware/getAuthToken';
import usersRouter from './api/routes/usersRoute'
import cors from 'cors';
import helmet from 'helmet'
import mongoose from 'mongoose'
import vueshopRoute from './api/routes/vueshopRoute';

const connection = await mongoose.connect("mongodb//localhost:27017/OnlineShop")
console.log("Connected to mongodb")

const port = process.env.PORT || 4000;

const app = express();

app.use(
    cors({
        origin: "*",
    })
)

app.use(helmet())

app.use(express.urlencoded({extended: true }));

app.use(express.json())

app.use(getAuthToken);

// app.use(checkIfAuthenticated);

app.use('/users', usersRouter);

app.use('/vueshop', vueshopRoute)

app.listen(port, () => {
    console.log(`Vue Shop Apis running on port ${port}`);
})