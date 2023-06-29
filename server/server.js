const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Configurar o transporte de e-mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'seu_email@gmail.com',
    pass: 'sua_senha_do_email',
  },
});

// Rota para enviar um e-mail
app.get('/enviar-email', (req, res) => {
  const mailOptions = {
    from: 'seu_email@gmail.com',
    to: 'destinatario@example.com',
    subject: 'Assunto do e-mail',
    text: 'Conteúdo do e-mail',
  };

  // Enviar o e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Erro ao enviar o e-mail');
    } else {
      console.log('E-mail enviado:', info.response);
      res.send('E-mail enviado com sucesso');
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
