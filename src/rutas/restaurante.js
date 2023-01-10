const express = require('express');
const router = express.Router();
const restaurante = require('../funciones/FuncionesRest');

router.post('/aniadir/:id', restaurante.crearRest);
router.post('/cifrar/:id', restaurante.cifrarId);
router.get('/verRests/:id', restaurante.obtenerRests);
router.get('/:id', restaurante.obtenerRest);
router.post('/filtrarDueno/:id', restaurante.filtradoDueno);
router.put('/:id', restaurante.editarRest);
router.delete('/:id', restaurante.borrarRest);
router.get('/', restaurante.cargarRest);

module.exports = router;   