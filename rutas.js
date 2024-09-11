const router = require("express").Router();
const { sendMail } = require("./mailService"); // Importar desde el archivo mailService.js

router.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

router.get("/contact", (req, res) => {
  res.sendFile("./views/contact.html", { root: __dirname });
});

router.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

router.get("/courses", (req, res) => {
  res.sendFile("./views/courses.html", { root: __dirname });
});

router.get("/events", (req, res) => {
  res.sendFile("./views/events.html", { root: __dirname });
});

// Ruta para manejar el formulario de contacto
router.post("/send-message", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await sendMail(email, name, message); // Enviar los correos
    res.status(200).sendFile("./views/contact.html", { root: __dirname });
  } catch (error) {
    res.status(500).send("Error al enviar el correo");
  }
});

module.exports = router;
