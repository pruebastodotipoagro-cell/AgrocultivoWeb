require("dotenv").config();

const path =
    require("path");

const express =
    require("express");

const helmet =
    require("helmet");

const cookieParser =
    require("cookie-parser");

const pool =
    require("./config/database");

const authRoutes =
    require("./routes/auth");

const {
    requireAuth
} = require("./middleware/auth");


const app =
    express();


/* =========================================================
   CONFIGURACIÓN
========================================================= */

app.use(
    helmet({
        contentSecurityPolicy: false
    })
);

app.use(
    express.json()
);

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(
    cookieParser()
);


/* =========================================================
   ARCHIVOS ESTÁTICOS
========================================================= */

app.use(
    "/css",
    express.static(
        path.join(
            __dirname,
            "public/css"
        )
    )
);

app.use(
    "/js",
    express.static(
        path.join(
            __dirname,
            "public/js"
        )
    )
);

app.use(
    "/assets",
    express.static(
        path.join(
            __dirname,
            "public/assets"
        )
    )
);


/* =========================================================
   API AUTENTICACIÓN
========================================================= */

app.use(
    "/api/auth",
    authRoutes
);


/* =========================================================
   LOGIN
========================================================= */

app.get(
    "/",
    (req, res) => {

        res.sendFile(
            path.join(
                __dirname,
                "public/login.html"
            )
        );

    }
);


app.get(
    "/login.html",
    (req, res) => {

        res.sendFile(
            path.join(
                __dirname,
                "public/login.html"
            )
        );

    }
);


/* =========================================================
   SISTEMA PROTEGIDO
========================================================= */

app.get(
    "/index.html",
    requireAuth,
    (req, res) => {

        res.sendFile(
            path.join(
                __dirname,
                "public/index.html"
            )
        );

    }
);


/* =========================================================
   HEALTH CHECK
========================================================= */

app.get(
    "/health",
    async (req, res) => {

        try {

            const [rows] =
                await pool.query(
                    `
                    SELECT
                        NOW() AS server_time
                    `
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
                    status:
                        "error",
                    database:
                        "disconnected",
                    engine:
                        "mysql"
                });

        }

    }
);


/* =========================================================
   SERVIDOR
========================================================= */

const PORT =
    Number(
        process.env.PORT ||
        3000
    );


app.listen(
    PORT,
    "127.0.0.1",
    () => {

        console.log(
            `AgrocultivoWeb ejecutándose en puerto ${PORT}`
        );

    }
);