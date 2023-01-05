const mongoose = require('mongoose');

const DatosStock = mongoose.Schema({
    nom_rest: {
        type: String,
        require: true
    },

    nom_prod: {
        type: String,
        require: true
    },

    estado: {
        type: String,
        require: true
    },

    coste_total: {
        type: Number,
        require: true 
    },

    cantidad: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('Stock', DatosStock);