const { Router } = require('express');
const router = Router();

const nodemailer = require('nodemailer');

router.post('/send-email', async (req, res) => {
  const {
    id,
    name,
    address,
    number,
    district,
    zipCode,
    city,
    state,
    email,
    phone,
    birth,
  } = req.body;

  contentHTML = `
    <h1>Cliente:</h1>
    <ul>
        <li><b>#Id:</b> ${id}</li>
        <li><b>Nome:</b> ${name}</li>
        <li><b>Endereço:</b> ${address}, <spam>${number}</span></li>
        <li><b>Bairro:</b> ${district}</li>
        <li><b>CEP:</b> ${zipCode}</li>
        <li><b>Cidade:</b> ${city}</li>
        <li><b>Estado:</b> ${state}</li>
        <li><b>E-mail:</b> ${email}</li>
        <li><b>Telefone:</b> ${phone}</li>
        <li><b>Nascimento:</b> ${birth}</li>
    </ul>
  `;

  let transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'username',
      pass: 'password',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let info = await transporter.sendMail({
    from: 'Marcius Magazine - Cadastro de cliente <lorenzecodetest@gmail.com>',
    to: ['lorenzecode@gmail.com', 'danielzebini@hotmail.com'],
    subject: 'Cliente: ' + name,
    messageId: '',
    html: contentHTML,
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.redirect('/success.html');
});

module.exports = router;
