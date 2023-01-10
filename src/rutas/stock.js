const express = require('express');
const router = express.Router();
const stock = require('../funciones/FuncionesStock');

router.post('/aniadir/:id', stock.crearProd);
router.post('/filtrarNom/:id', stock.filtradoNom);
router.get('/verProds/:id', stock.obtenerProds);
router.get('/:id', stock.obtenerProd);
router.get('/', stock.cargarStocks);
router.put('/:id', stock.editarProd);
router.delete('/:id', stock.borrarProd);

module.exports = router; 