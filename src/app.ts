import express from "express";
import devicesRoute from "./routes/devices.js";
import { errorHandler } from "./middleware/errorHandler.js";


const app = express();

app.use(express.json());
app.use("/devices", devicesRoute);
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use(errorHandler)

export default app;