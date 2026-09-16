require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const pool = require("./config/database");

const app = express();

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "AgrocultivoWeb",
    status: "running"
  });
});

app.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT NOW()");

    res.json({
      status: "ok",
      database: "connected"
    });
  } catch (error) {
    console.error("Error PostgreSQL:", error);

    res.status(500).json({
      status: "error",
      database: "disconnected"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`AgrocultivoWeb ejecutándose en puerto ${PORT}`);
});