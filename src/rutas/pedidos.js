const express = require('express');
const router = express.Router();
const pedido = require('../funciones/FuncionesPedidos');

router.post('/aniadir/:id', pedido.crearPedido);
router.get('/verPedidos/:id', pedido.obtenerPedidos);
router.get('/verRests/:id', pedido.obtenerRestaurantes);
router.get('/:id', pedido.obtenerPedido);
router.get('/filtrado/:id', pedido.filtrarPedido);
router.put('/:id', pedido.editarPedido);
router.delete('/:id', pedido.borrarPedido);
router.get('/', pedido.cargarPedidos);

module.exports = router; 