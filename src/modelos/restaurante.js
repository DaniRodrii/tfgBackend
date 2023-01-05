const mongoose = require('mongoose');

const DatosRestaurante = mongoose.Schema({
    nom_rest: {
        type: String,
        require: true,
        unique: true
    },

    nom_dueno: {
        type: String,
        require: true
    },

    telefono: {
        type: Number,
        require: true,
        unique: true
    },

    mesas: {
        type: Number,
        require: true
    },

    id_user: {
        type: String,
        require: true
    },

    direccion: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Restaurante', DatosRestaurante);
