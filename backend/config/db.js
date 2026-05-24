const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "proyecto",
    database: "multistock_db"
});

conexion.connect((err) => {

    if (err) {
        console.log("Error MySQL:", err);
        return;
    }

    console.log("✅ MySQL conectado");

});

module.exports = conexion;