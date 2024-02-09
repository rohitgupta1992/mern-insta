import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// routes
import authRouter from "./routes/authRouter.js";
import userRouter from './routes/userRouter.js';

config();

const app = express();

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
app.use(cookieParser())
/// api router 
app.use('/api/v1',authRouter )
app.use('/api/v1',userRouter)
app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to the API!" });
});

export default app;
