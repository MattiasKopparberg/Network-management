import express from "express";
import devicesRoute from "./routes/devices";
import locationsRoute from "./routes/locations";
import deviceVlanRoute from "./routes/devicevlan";
import maintenanceRoute from "./routes/maintenance";
import usersRoute from "./routes/users";
import vlanRoute from "./routes/vlan";
import authRoute from "./routes/auth";

import { errorHandler } from "./middleware/errorHandler";


const app = express();

app.use(express.json());
app.use("/devices", devicesRoute);
app.use("/locations", locationsRoute)
app.use("/deviceVlan", deviceVlanRoute)
app.use("/maintenance", maintenanceRoute)
app.use("/users", usersRoute)
app.use("/vlan", vlanRoute)
app.use("/auth", authRoute)


app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use(errorHandler)

export default app;