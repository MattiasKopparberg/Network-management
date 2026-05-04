import express from "express";
import app from "./app.js";

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

app.listen(3000, () => {
  console.log("Running on port 3000");
});
