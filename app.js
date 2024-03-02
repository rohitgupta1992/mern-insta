import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { createServer } from 'http';
import { Server } from 'socket.io';
import SocketServer from "./socketSever.js";
// routes
 
import authRouter from "./routes/authRouter.js";
import userRouter from './routes/userRouter.js';
import postRouter from './routes/postRouter.js';
import commentRouter from './routes/commentRouter.js';
import notifyRouter from './routes/notifyRouter.js';
import messageRouter from './routes/messageRouter.js'
config();

 
const app = express();
const http = createServer(app);
const io = new Server(http);
io.on('connection', (socket) => {
  SocketServer(socket)
});
 
// connectDB();
app.use(morgan("dev"))
app.use(cookieParser());
app.use(json()); // for parsing application/json
const corsOptions = {
  origin: "*", // Allow requests from this origin
  methods: "GET,POST", // Allow only these HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allow only these headers
  optionsSuccessStatus: 200, // Return this status code for preflight requests
};

app.use(cors(corsOptions));
app.use(cookieParser());
/// api router 
app.use('/api/v1',authRouter );
app.use('/api/v1',userRouter);
app.use("/api/v1", postRouter);
app.use("/api/v1", commentRouter);
app.use("/api/v1", notifyRouter);
app.use("/api/v1", messageRouter);
app.get('/',(req,res)=>{
  res.status(200).json({msg:"server works perfect"})
})


export default http;
