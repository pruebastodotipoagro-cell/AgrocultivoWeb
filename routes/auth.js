const express =
    require("express");

const bcrypt =
    require("bcryptjs");

const jwt =
    require("jsonwebtoken");

const pool =
    require("../config/database");

const {
    requireAuth,
    COOKIE_NAME
} = require("../middleware/auth");


const router =
    express.Router();


/* =========================================================
   LOGIN
========================================================= */

router.post(
    "/login",
    async (req, res) => {

        try {

            const username =
                String(
                    req.body.username || ""
                ).trim();


            const password =
                String(
                    req.body.password || ""
                );


            if (
                !username ||
                !password
            ) {

                return res
                    .status(400)
                    .json({
                        ok: false,
                        message:
                            "Ingrese usuario y contraseña."
                    });

            }


            const [rows] =
                await pool.query(
                    `
                    SELECT
                        u.id,
                        u.username,
                        u.full_name,
                        u.password_hash,
                        u.role,
                        u.branch_id,
                        u.quickbooks_cashier_name,
                        u.active,
                        u.failed_login_count,
                        u.locked_until,

                        b.name AS branch_name,
                        b.code AS branch_code

                    FROM users u

                    INNER JOIN branches b
                        ON b.id = u.branch_id

                    WHERE LOWER(u.username)
                        = LOWER(?)

                    LIMIT 1
                    `,
                    [username]
                );


            if (
                rows.length === 0
            ) {

                return res
                    .status(401)
                    .json({
                        ok: false,
                        message:
                            "Usuario o contraseña incorrectos."
                    });

            }


            const user =
                rows[0];


            if (
                !user.active
            ) {

                return res
                    .status(403)
                    .json({
                        ok: false,
                        message:
                            "Este usuario está desactivado."
                    });

            }


            if (
                user.locked_until &&
                new Date(user.locked_until) >
                new Date()
            ) {

                return res
                    .status(423)
                    .json({
                        ok: false,
                        message:
                            "Usuario temporalmente bloqueado. Intente nuevamente más tarde."
                    });

            }


            const validPassword =
                await bcrypt.compare(
                    password,
                    user.password_hash
                );


            if (
                !validPassword
            ) {

                const failures =
                    Number(
                        user.failed_login_count || 0
                    ) + 1;


                if (
                    failures >= 5
                ) {

                    await pool.query(
                        `
                        UPDATE users
                        SET
                            failed_login_count = 0,
                            locked_until =
                                DATE_ADD(
                                    NOW(),
                                    INTERVAL 15 MINUTE
                                )
                        WHERE id = ?
                        `,
                        [user.id]
                    );

                }
                else {

                    await pool.query(
                        `
                        UPDATE users
                        SET failed_login_count = ?
                        WHERE id = ?
                        `,
                        [
                            failures,
                            user.id
                        ]
                    );

                }


                return res
                    .status(401)
                    .json({
                        ok: false,
                        message:
                            "Usuario o contraseña incorrectos."
                    });

            }


            await pool.query(
                `
                UPDATE users
                SET
                    failed_login_count = 0,
                    locked_until = NULL,
                    last_login_at = NOW()
                WHERE id = ?
                `,
                [user.id]
            );


            const payload = {

                userId:
                    user.id,

                username:
                    user.username,

                fullName:
                    user.full_name,

                role:
                    user.role,

                branchId:
                    user.branch_id,

                branchName:
                    user.branch_name,

                branchCode:
                    user.branch_code,

                cashierName:
                    user.quickbooks_cashier_name
            };


            const token =
                jwt.sign(
                    payload,
                    process.env.JWT_KEY,
                    {
                        expiresIn: "8h"
                    }
                );


            const secureCookie =
                String(
                    process.env.COOKIE_SECURE
                ).toLowerCase() ===
                "true";


            res.cookie(
                COOKIE_NAME,
                token,
                {
                    httpOnly: true,
                    secure:
                        secureCookie,
                    sameSite:
                        "strict",
                    maxAge:
                        8 *
                        60 *
                        60 *
                        1000
                }
            );


            return res.json({
                ok: true,

                user: {
                    id:
                        user.id,

                    username:
                        user.username,

                    fullName:
                        user.full_name,

                    role:
                        user.role,

                    branchId:
                        user.branch_id,

                    branchName:
                        user.branch_name,

                    branchCode:
                        user.branch_code,

                    cashierName:
                        user.quickbooks_cashier_name
                }
            });

        }
        catch (error) {

            console.error(
                "Error login:",
                error
            );


            return res
                .status(500)
                .json({
                    ok: false,
                    message:
                        "No fue posible iniciar sesión."
                });

        }

    }
);


/* =========================================================
   USUARIO ACTUAL
========================================================= */

router.get(
    "/me",
    requireAuth,
    (req, res) => {

        res.json({
            ok: true,
            user: req.user
        });

    }
);


/* =========================================================
   CERRAR SESIÓN
========================================================= */

router.post(
    "/logout",
    (req, res) => {

        res.clearCookie(
            COOKIE_NAME
        );


        res.json({
            ok: true
        });

    }
);


module.exports =
    router;