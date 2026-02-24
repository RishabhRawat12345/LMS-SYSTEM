import express from "express";
import dotenv from "dotenv";
import ConnectDb from "./config/Db.js";
import cookieParser from "cookie-parser";
import authroutes from "./route/authRoute.js";
import cors from "cors";
import route from "./route/userRoute.js";
import Resetrouter from "./route/resetRoute.js";
import Courseroute from "./route/courseRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://lms-system-lyart.vercel.app",
    credentials: true,
  })
);

app.use("/api/auth", authroutes);
app.use("/api",route);
app.use("/api/reset",Resetrouter);
app.use("/api/course",Courseroute);
app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, async () => {
  await ConnectDb();
  console.log(`server is started on port ${port}`);
});
