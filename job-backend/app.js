import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import userRouter from './routes/userRouter.js'
import jobRouter from './routes/jobRouter.js'
import applicationRouter from './routes/applicationRouter.js'
import { db } from './database/db.js';
import { errorMiddleware } from './middlewares/error.js';


const app = express();

dotenv.config({path:'./config/config.env'});



// Define a route for '/'
app.get('/', (req, res) => {
  res.send('Hello, World!'); // Respond with a simple message
});


app.use(cors({
    origin:[process.env.FRONTED_URL],
    methods:['GET','POST','DELETE','PUT','OPTIONS'],
    credentials:true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/temp",
}));

app.use("/user",userRouter);
app.use("/application",applicationRouter);
app.use("/job",jobRouter);

//database
db();

//error middleware in last
app.use(errorMiddleware);

export default app;