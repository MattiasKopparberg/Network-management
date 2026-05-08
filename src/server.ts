import app from "./app.js";
import { db } from "./config/db.js";

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

const gracefulShutdown = async () => {
  console.log("Shutting down gracefully...");

  try {

    await db.end();

    server.close(() => {
      console.log("Server closed");

      process.exit(0);
    });

  } catch (err) {

    console.error("Shutdown error:", err);

    process.exit(1);
  }
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);