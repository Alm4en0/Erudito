const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
require("dotenv").config(); // Cargar variables de entorno desde .env

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID, // ClientID
  process.env.GOOGLE_CLIENT_SECRET, // Client Secret
  "https://developers.google.com/oauthplayground" // Redirection URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

async function sendMail(userEmail, userName, userMessage) {
  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken.token,
    },
  });

  await transporter.sendMail({
    from: userEmail,
    to: process.env.GMAIL_USER,
    subject: "Nuevo mensaje Formulario Contacto",
    text: `Nombre: ${userName}\nCorreo: ${userEmail}\nMensaje: ${userMessage}`,
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: userEmail,
    subject: "Gracias por tu interés en Erudito",
    text: `Estimado/a ${userName},\n\nGracias por tu interés en los cursos de Erudito. Hemos recibido tu mensaje. Nos pondremos en contacto contigo lo antes posible.\n\nMientras tanto, te invitamos a visitar nuestros próximos eventos aquí: http://localhost:3000/events.\n\nAtentamente,\nErudito`,
  });
}

module.exports = { sendMail };
