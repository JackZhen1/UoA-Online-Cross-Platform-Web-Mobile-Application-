import "dotenv/config";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import * as swaggerJson from "./middleware/__generated__/swagger.json";
import * as swaggerUI from "swagger-ui-express";
import { RegisterRoutes } from "./middleware/__generated__/routes";
import connectToDatabase from "./data-layer/adapter/mongodb";
import { ErrorRequestHandler } from "express";

import "./data-layer/sqlite-demo";

export const app = express();

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors({ origin: "*" }));

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
};

// Swagger + Routes
RegisterRoutes(app);
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerJson));

const port = Number(process.env.PORT) || 3000;


const startServer = async () => {
  try {
    if (process.env.USE_SQLITE === "true") {
      console.log("📦 Running in local SQLite demo mode (no MongoDB connection)");
    } else {
      console.log("🔗 Connecting to MongoDB...");
      await connectToDatabase();
    }

    app.listen(port, "0.0.0.0", () => {
      console.log(`✅ Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ ERROR starting server:", error);
  }
};

app.use(errorHandler);

startServer();
