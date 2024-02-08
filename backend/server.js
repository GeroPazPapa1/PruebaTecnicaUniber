const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conexión a la base de datos
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "proyecto40",
  port: 3306,
});

// Conecta a la base de datos
connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    return;
  }
  console.log("Conexión establecida correctamente a la base de datos MySQL");
});


// Reporte de Ventas
app.get("/reporte-ventas", (req, res) => {
  // Realiza consulta a la base de datos
  connection.query(
    `SELECT c.ID AS 'ID DE MOVIMIENTO DE VENTAS',
    c.TOTAL AS 'TOTAL DEL MOVIMIENTO EN PESOS',
    c.FEC AS 'FECHA DE LA VENTA',
    CONCAT(c.LET, LPAD(c.PREF, 4, '0'), '-', LPAD(c.NUM, 8, '0')) AS 'COMPROBANTE FACTURA'
FROM st_movivta_c c
ORDER BY c.FEC DESC;`,
    (err, results) => {
      if (err) {
        console.error("Error al ejecutar la consulta:", err);
        res.status(500).send("Error al obtener el reporte de ventas");
        return;
      }
      // Enviar resultados como respuesta
      res.json(results);
    }
  );
});

// Reporte de Entregas
app.get("/reporte-entregas", (req, res) => {
  // Realiza consulta a la base de datos
  connection.query(
    `SELECT 
    ec.ID AS ID_DE_ENTREGA,
    GROUP_CONCAT(DISTINCT ei.DES SEPARATOR ', ') AS ITEMS_DE_LA_ENTREGA,
    ec.FECHA AS FECHA_DE_ENTREGA,
    CONCAT(ec.SUC, '-', ec.ID) AS IDENTIFICADOR_DE_LA_ENTREGA,
    CONCAT(ec.MOVIVTA_LET, '-', ec.MOVIVTA_PREF, '-', ec.MOVIVTA_NUM) AS FACTURA_RELACIONADA
FROM
    lg_entrega_c ec
        INNER JOIN
    lg_entrega_i ei ON ec.SUC = ei.SUC AND ec.ID = ei.ID
GROUP BY ec.ID, ec.FECHA, ec.SUC ;
`,
    (err, results) => {
      if (err) {
        console.error("Error al ejecutar la consulta:", err);
        res.status(500).send("Error al obtener el reporte de entregas");
        return;
      }
      // Enviar resultados como respuesta
      res.json(results);
    }
  );
});

// Puerto 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
