import  express  from "express";
import { config } from "dotenv";
import userRouter from "./routes/newsRoute.js";
import newspaperRouter from "./routes/newspaperRoute.js";
import cors from "cors"
import connectDb from "./data/database.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { ErrorMiddleware } from "./middlewares/error.js";



config({
    path:"./data/config.env"
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const server = express()

connectDb()

// USING MIDDLEWARES
server.use(cors({
    origin:[process.env.FRONTEND_URL_1, process.env.FRONTEND_URL_2],
    methods:["GET","PUT", "POST", "DELETE"],
    credentials:true
}))

server.use(express.urlencoded({extended:true}))
server.use(express.json())
server.use('/uploads',express.static(__dirname + '/uploads'))
server.use(ErrorMiddleware)


// ROUTES
server.use(userRouter)
server.use(newspaperRouter)

server.listen(process.env.PORT , ()=>{
    console.log(`server is running on port ${process.env.PORT}` )
})