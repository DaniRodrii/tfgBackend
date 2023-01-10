const pedidos = require('../modelos/pedidos');
const restaurante = require('../modelos/restaurante');
const jwt = require('jsonwebtoken')
const funcionesPedidos = {};

funcionesPedidos.crearPedido = async (req, res) => {
    const pedido=pedidos(req.body);
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;
    pedido.id_user=id;
    pedido.save();
    return res.status(200).json('ok');
}

funcionesPedidos.obtenerPedidos = async (req, res) => {

    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;

    let pedido = await pedidos.find({id_user:id});
    return res.status(200).send(pedido);

}

funcionesPedidos.obtenerRestaurantes = (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;

    restaurante.find({id_user:id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

funcionesPedidos.obtenerPedido = async (req, res) => {
    let id=req.params.id;
    
    await pedidos.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

funcionesPedidos.editarPedido = (req, res) => {
    let id=req.params.id;

    pedidos.findByIdAndUpdate(id, req.body)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

funcionesPedidos.borrarPedido = (req, res) => {
    let id=req.params.id;

    pedidos.findByIdAndDelete(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

funcionesPedidos.filtrarPedido = (req, res) => {
    let nombre=req.params.id;

    pedidos.find({nom_rest:nombre})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

funcionesPedidos.cargarPedidos = (req, res) => {
    pedidos.find() 
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
};

module.exports = funcionesPedidos;