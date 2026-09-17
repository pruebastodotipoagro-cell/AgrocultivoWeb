require("dotenv").config();

const express = require("express");
const helmet = require("helmet");

const pool = require("./config/database");

const app = express();

app.use(
    helmet({
        contentSecurityPolicy: false
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));


/* =========================================================
   LOGIN
========================================================= */

app.get("/", (req, res) => {

    res.sendFile(
        "login.html",
        {
            root: "public"
        }
    );

});


/* =========================================================
   HEALTH CHECK
========================================================= */

app.get(
    "/health",
    async (req, res) => {

        try {

            const [rows] =
                await pool.query(
                    "SELECT NOW() AS server_time"
                );

            res.json({
                status: "ok",
                database: "connected",
                engine: "mysql",
                serverTime:
                    rows[0].server_time
            });

        }
        catch (error) {

            console.error(
                "Error MySQL:",
                error
            );

            res
                .status(500)
                .json({
                    status: "error",
                    database:
                        "disconnected",
                    engine: "mysql"
                });

        }

    }
);


/* =========================================================
   SERVIDOR
========================================================= */

const PORT =
    process.env.PORT ||
    3000;


app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `AgrocultivoWeb ejecutándose en puerto ${PORT}`
        );

    }
);