const express = require('express');
const router = express.Router();
const usuario = require('../funciones/FuncionesUser');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const user = require('../modelos/usuario');

router.post('/registro', usuario.crearUser);
router.post('/login', usuario.loguearUser);
router.post('/recu', usuario.recuContra);
router.put('/recuContra/:id', usuario.recuperacion);
router.get('/', usuario.obtenerUsers);
router.get('/:id', usuario.obtenerUser);
router.put('/:id', usuario.editarUsers);
router.delete('/:id', usuario.borrarUsers);


const almacenarImg = multer.diskStorage({
    filename: function(req, file ,cb)  {
        const extension = file.originalname.split('.').pop();
        const fileName=Date.now();
        cb(null, `${fileName}.${extension}`)
    },
    
    destination:`${__dirname}/../uploads`
})  


const almacen = multer({storage: almacenarImg})

 
router.post('/subida/:id', almacen.single('imagen'), usuario.subidaImg);


module.exports = router; 