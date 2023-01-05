const express = require('express');
const rutasUsuario = require('./rutas/usuarios');
const rutasRest = require('./rutas/restaurante');
const rutasEmp = require('./rutas/empleado');
const rutasStock = require('./rutas/stock');
const rutasPedidos = require('./rutas/pedidos');
const app =express();
const cors = require('cors');
const join = require("path").join;
const cookieParser=require("cookie-parser");


const port= process.env.PORT || 4000;

app.set('port', port);


//gestión de rutas
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, "./uploads")));
app.use(cookieParser());
app.use('/api/usuarios', rutasUsuario);
app.use('/api/restaurante', rutasRest);
app.use('/api/empleado', rutasEmp);
app.use('/api/stock', rutasStock);
app.use('/api/pedidos', rutasPedidos);


//rutas 
app.get('/', (req, res) => {
    res.send('Bienvenido'); 
});

module.exports = app; 