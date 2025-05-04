const nodemailer = require('nodemailer');

const enviarPDF = async (req, res) => {
  const { emailDestino } = req.body;


  if (!req.file || !emailDestino) {
    return res.status(400).json({ error: 'Faltan datos o archivo PDF' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailDestino,
    subject: 'Tu archivo PDF',
    text: 'Adjunto tu archivo PDF.',
    attachments: [
      {
        filename: req.file.originalname,
        content: req.file.buffer,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ mensaje: 'Correo enviado correctamente' });
  } catch (err) {
    console.error('❌ Error al enviar correo:', err);
    res.status(500).json({
      error: 'Error al enviar correo',
      detalle: err.message
    });
  }
};

module.exports = { enviarPDF };
