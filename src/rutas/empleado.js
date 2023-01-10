const express = require('express');
const router = express.Router();
const empleado = require('../funciones/FuncionesEmp');

router.post('/aniadir/:id', empleado.crearEmp);
router.post('/cifrar/:id', empleado.cifrarId);
router.post('/filtrarDNI/:id', empleado.filtradoDNI);
router.post('/filtrarCargo/:id', empleado.filtradoCargo);
router.get('/verEmps/:id', empleado.obtenerEmps);
router.get('/:id', empleado.obtenerEmp);
router.put('/:id', empleado.editarEmp);
router.delete('/:id', empleado.borrarEmp);
router.get('/', empleado.cargarEmps);

module.exports = router; 