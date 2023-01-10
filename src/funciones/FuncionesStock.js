const stock = require('../modelos/stock');
const restaurante = require('../modelos/restaurante');
const jwt = require('jsonwebtoken');

const funcionesStock = {};

funcionesStock.crearProd = async (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;
    
    const rest = await restaurante.findOne({_id:id});
    const prod = stock(req.body);
    prod.nom_rest=rest.nom_rest;
     
    prod.save();
    return res.status(200).json('ok');
}

funcionesStock.obtenerProds = async (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;
    
    const rest = await restaurante.findOne({_id:id});

    stock.find({nom_rest:rest.nom_rest})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}


funcionesStock.obtenerProd = async (req, res) => {
    const id=req.params.id;
    
    await stock.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

funcionesStock.editarProd = (req, res) => {
    const id=req.params.id;
    console.log(req.body)

    stock.findByIdAndUpdate(id, req.body)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

funcionesStock.borrarProd = (req, res) => {
    let id=req.params.id;
    console.log(id);

    stock.findByIdAndDelete(id)
        .then(
            (data) => res.json(data)
        )
        .catch((error) => res.json({message: error}));
}

funcionesStock.filtradoNom = async (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;
    
    const rest = await restaurante.findOne({_id:id});

    stock.find({nom_rest:rest.nom_rest, nom_prod:req.body.nom_prod})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

funcionesStock.cargarStocks = (req, res) => {
    stock.find() 
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
};

module.exports = funcionesStock; 