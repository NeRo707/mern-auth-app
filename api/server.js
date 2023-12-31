import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

const port = process.env.PORT || 5000;
const app = express();
 
const corsOptions = {
  credentials: true,
  origin: 'https://nero-mern-app.onrender.com',
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);


app.use(notFound);
app.use(errorHandler);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port localhost:${port}`);
  });
});
