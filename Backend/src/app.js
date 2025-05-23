// Configure environment variables with our .env file
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
// ----------------------------------------------------------
// Set's our port to the PORT environment variable, or 3000 by default if the env is not configured.
const PORT = process.env.PORT ?? 3000;

// Creates the express server
const app = express();

// Configure middleware (logging, CORS support, JSON parsing support, static files support)
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
// Import and use our application routes.
import routes from "./routes/routes.js";
app.use("/", routes);
app.use(morgan("combined"));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true
  })
);
/**
 * Starts the Express server running on the given port. Once up and running, the given function will be called,
 * which in this case will log the below message to the console to let you know that the server has started
 * successfully.
 */
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

app.use((req, res) => {
  res.status(404).send("Route not found: " + req.originalUrl);
});