// Modelos
const usuario = require('../modelos/usuario');
const stock = require('../modelos/stock');
const restaurante = require('../modelos/restaurante');
const pedido = require('../modelos/pedidos');
const empleado = require('../modelos/empleado');

const jwt = require('jsonwebtoken')
const funcionesUsuario = {};
const bcrypt = require("bcryptjs");
const  enviarMail = require('../funciones/enviarMail');

//Crear usuario
funcionesUsuario.crearUser = async (req, res) => {
    const user = usuario(req.body);
    user.imagen='fotoperfil.png';
    const token=jwt.sign({_id: user._id}, 'auth');

    console.log(user);

    let usuarioEncontrado = await usuario.findOne({nom_user: user.nom_user});
    if(usuarioEncontrado){
        return res.status(400).json({
            message: "El nombre de usuario ya existe",
            success: false
        })
    }

    usuarioEncontrado = await usuario.findOne({correo: user.correo});
    if(usuarioEncontrado){
        return res.status(400).json({
            message: "El correo ya existe",
            success: false
        })
    }

    bcrypt.hash(user.contrasena, 10, (err, palabraSecretaEncriptada) => {
        if (err) {
            console.log("Error hasheando:", err);
        } else {
            user.contrasena=palabraSecretaEncriptada;
            user.save();
            var mensaje = "Hola "+user.nom_compl+" usted se ha registrado en Gestaurante, disfrute de la experiencia.";
            enviarMail(user.correo, mensaje);
            return res.status(200).json(token);
        }
    }); 
  
};



//login
funcionesUsuario.loguearUser = async (req, res) => {
    const user = await usuario.findOne({correo: req.body.correo});
    if(!user){
        return res.status(400).json({
            message: "El correo no existe",
            success: false
        })
    }

    bcrypt.compare(req.body.contrasena, user.contrasena, (err, coinciden) => {
        if (err) {
            return res.status(400).json({
                message: "Contraseña erronea",
                success: false
            })
        } else {
            if(coinciden){
                const token=jwt.sign({_id: user._id}, 'auth');
                return res.status(200).json(token);
            }else{
                return res.status(400).json({
                    message: "Contraseña erronea",
                    success: false
                })
            }
        }
    });

} 

//Obtener usuarios
funcionesUsuario.obtenerUsers = (req, res) => {
    usuario.find() 
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
};

//Obtener usuario
funcionesUsuario.obtenerUser = async (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;
    
    await usuario.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
};

//Editar usuarios
funcionesUsuario.editarUsers = (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;


    console.log(req.body);

    usuario.findByIdAndUpdate(id, req.body)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));

};

//Borrar usuarios
funcionesUsuario.borrarUsers =  async (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id; 

    await usuario.findByIdAndDelete(id);
        
    let restaurantes=[];
    let empleados=[];
    let productos=[];
    let pedidos=[];
    restaurantes= await restaurante.find({id_user:id})
    for(let i=0; i<restaurantes.length;i++){
        let id_rest=restaurantes[i]._id;
        let nom_rest=restaurantes[i].nom_rest;
        await restaurante.findByIdAndDelete(id_rest);

        empleados= await empleado.find({id_rest:id_rest})
        for(let j=0; j<empleados.length;j++){
            let id_emp=empleados[j]._id;
            await empleado.findByIdAndDelete(id_emp);
        }

        productos= await stock.find({nom_rest:nom_rest})
        for(let k=0; k<productos.length;k++){
            let id_prod=productos[k]._id;
            await stock.findByIdAndDelete(id_prod);
        }

        pedidos= await pedido.find({nom_rest:nom_rest})
        for(let l=0; l<pedidos.length;l++){
            let id_pedidos=pedidos[l]._id;
            await pedido.findByIdAndDelete(id_pedidos);
        }
    }

    return res.status(200).json('ok');
};
 
//Subir imagen a la bbdd
funcionesUsuario.subidaImg = (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id; 
    usuario.findByIdAndUpdate(id, {'imagen':req.file.filename})
        .then((data) => res.json(req.file.filename))
        .catch((error) => res.json({message: error}));
}

//Recuperar contraseña
funcionesUsuario.recuContra = async (req, res) => {
    const user = await usuario.findOne({correo: req.body.correoRecu});

    if(!user){
        return res.status(400).json({
            message: "El usuario no existe",
            success: false
        })
    }

    const token=jwt.sign({_id: user._id}, 'auth');

    var mensaje = "Para recuperar su contraseña, pulse en el siguiente enlace http://gestaurante.net/recuperarContrase%C3%B1a";
    enviarMail(req.body.correoRecu, mensaje);
    return res.status(200).json(token);
}

//Nueva contraseña recuperada
funcionesUsuario.recuperacion = async (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;
    
    bcrypt.hash(req.body.contrasena, 10, (err, palabraSecretaEncriptada) => {
        if (err) {
            console.log("Error hasheando:", err);
        } else {
            usuario.findByIdAndUpdate(id, {contrasena:palabraSecretaEncriptada})
            .then((data) => res.json(data))
            .catch((error) => res.json({message: error}));
        }
    }); 
}   

funcionesUsuario.borrarUserAdmin =  async (req, res) => {
    let id=req.params.id;

    await usuario.findByIdAndDelete(id);
        
    let restaurantes=[];
    let empleados=[];
    let productos=[];
    let pedidos=[];
    restaurantes= await restaurante.find({id_user:id})
    for(let i=0; i<restaurantes.length;i++){
        let id_rest=restaurantes[i]._id;
        let nom_rest=restaurantes[i].nom_rest;
        await restaurante.findByIdAndDelete(id_rest);

        empleados= await empleado.find({id_rest:id_rest})
        for(let j=0; j<empleados.length;j++){
            let id_emp=empleados[j]._id;
            await empleado.findByIdAndDelete(id_emp);
        }

        productos= await stock.find({nom_rest:nom_rest})
        for(let k=0; k<productos.length;k++){
            let id_prod=productos[k]._id;
            await stock.findByIdAndDelete(id_prod);
        }

        pedidos= await pedido.find({nom_rest:nom_rest})
        for(let l=0; l<pedidos.length;l++){
            let id_pedidos=pedidos[l]._id;
            await pedido.findByIdAndDelete(id_pedidos);
        }
    }

    return res.status(200).json('ok');
};

funcionesUsuario.editarUsersAdmin = (req, res) => {
    let id=req.params.id;

    usuario.findByIdAndUpdate(id, req.body)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));

};

module.exports = funcionesUsuario;

