 const enviarMailControlador = {};
 const nodemailer = require('nodemailer');


const mail=enviarMailControlador.sendMail = (correo, mensaje) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'gestauranteempresa@gmail.com',
          pass: 'gbailkqpepipyepi'
        }
      });

      
      
      var mailOptions = {
        from: 'gestauranteempresa@gmail.com',
        to: correo,
        subject: '!Bienvenido a Gestaurante!',
        text: mensaje
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });
}

module.exports = mail;
 