const express = require("express");
const bodyParser = require("body-parser");

// Inicializar la aplicación
const app = express();
const port = 3000;

// Configurar body-parser para manejar datos POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar las rutas
const routes = require("./rutas");
app.use(routes);

// Configurar carpeta de estáticos
app.use("/assets", express.static("assets"));
app.use("/vendor", express.static("vendor"));

// Escuchar en el puerto
app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
