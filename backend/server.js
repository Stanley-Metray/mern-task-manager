import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from "cors";
import TaskManagerRouter from '../routes/task-manager-routes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

// All variables

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = "mongodb+srv://stanley-metray:0OIzQx8Eu3sj1kOb@task-manager.rxta0cd.mongodb.net/Task_Manager?retryWrites=true&w=majority";
const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

//Setting up all middlewares

// app.use(cors({
//     origin : ["http://localhost:3000","https://mern-task-manager-app.onrender.com"]
// }));

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(TaskManagerRouter);

// DEPLOYMENT CODE

if(process.env.NODE_ENV==="production")
{
    app.use(express.static(path.join(__dirname, "../frontend/build")));
    app.get("*",(req,res)=>{
        res.sendFile(
            path.resolve(__dirname,"../frontend", "build", "index.html")
        )
    })
}
else
{
    app.get("/", (req,res)=>{
        res.send("Home Page");
    });
}

//Connecting to mongodb atlas and running our server

mongoose
.connect(MONGO_URI)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error)=>{
    console.log(error);
});

