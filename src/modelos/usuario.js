const mongoose = require('mongoose');

const DatosUsuario = mongoose.Schema({
    nom_compl: {
        type: String,
        require: true
    },

    nom_user: {
        type: String,
        require: true,
        unique: true
    },

    edad: {
        type: Number,
        require: true
    },

    correo: {
        type: String,
        require: true,
        unique: true
    },

    contrasena: {
        type: String,
        require: true
    },

    imagen: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Usuario', DatosUsuario);