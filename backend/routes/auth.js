const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const db = require("../config/db");

router.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = `
    SELECT
        id,
        nombre,
        email,
        password,
        rol
    FROM usuarios
    WHERE email = ?
    AND activo = 1
    `;

    db.query(
        sql,
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {

                return res.json({
                    success: false,
                    message: "Usuario no encontrado"
                });

            }

            const usuario = result[0];

            const coincide = await bcrypt.compare(
                password,
                usuario.password
            );

            if (!coincide) {

                return res.json({
                    success: false,
                    message: "Contraseña incorrecta"
                });

            }

            delete usuario.password;

            res.json({
                success: true,
                user: usuario
            });

        }

    );

});

module.exports = router;