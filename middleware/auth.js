const jwt = require("jsonwebtoken");

const COOKIE_NAME = "agrocultivo_session";


function requireAuth(req, res, next) {

    const token =
        req.cookies?.[COOKIE_NAME];


    if (!token) {

        return res.status(401).json({
            ok: false,
            message: "Sesión no válida."
        });

    }


    try {

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_KEY
            );


        req.user =
            decoded;


        next();

    }
    catch (error) {

        res.clearCookie(
            COOKIE_NAME
        );


        return res.status(401).json({
            ok: false,
            message: "La sesión ha expirado."
        });

    }

}


module.exports = {
    requireAuth,
    COOKIE_NAME
};