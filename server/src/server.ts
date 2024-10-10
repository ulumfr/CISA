import express from "express";
import bodyParser from "body-parser";
import routes from "./route";
import connect from "./utils/database";
import cors from "cors";
// import { randomBytes } from "crypto";

// const secret = randomBytes(16).toString("hex");
// console.log(secret);

// async function startServer() {
const app = express();
const PORT = process.env.PORT || 3000;

export const db = connect();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// app.use("/api/storage/uploads", express.static("./storage/uploads"));
app.use("/storage/uploads", express.static("./storage/uploads"));
app.use("/api", routes);
// async await connect();

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
// }
// startServer();
