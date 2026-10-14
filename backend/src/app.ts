
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import devicesRoute from "./routes/devices.js";
import locationsRoute from "./routes/locations.js";
import deviceVlanRoute from "./routes/devicevlan.js";
import maintenanceRoute from "./routes/maintenance.js";
import usersRoute from "./routes/users.js";
import vlanRoute from "./routes/vlan.js";
import authRoute from "./routes/auth.js";
import cors from "cors"

import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/devices", devicesRoute);
app.use("/locations", locationsRoute);
app.use("/deviceVlan", deviceVlanRoute);
app.use("/maintenance", maintenanceRoute);
app.use("/users", usersRoute);
app.use("/vlan", vlanRoute);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use(errorHandler);

export default app;
