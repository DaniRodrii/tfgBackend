const stock = require('../modelos/stock');
const restaurante = require('../modelos/restaurante');
const pedido = require('../modelos/pedidos');
const empleado = require('../modelos/empleado');
const jwt = require('jsonwebtoken')
const funcionesRestaurante = {};

funcionesRestaurante.crearRest = async (req, res) => {
    const rest=restaurante(req.body);

    let restauranteEncontrado = await restaurante.findOne({nom_rest: rest.nom_rest});
    if(restauranteEncontrado){
        return res.status(400).json({
            message: "El restaurante ya existe",
            success: false
        })
    }

    restauranteEncontrado = await restaurante.findOne({telefono: rest.telefono});
    if(restauranteEncontrado){
        return res.status(400).json({
            message: "El telefono ya existe",
            success: false
        })
    }

    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;
    rest.id_user=id;
     
    rest.save();
    return res.status(200).json('ok');
}

funcionesRestaurante.obtenerRests = (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;

    restaurante.find({id_user:id})
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

funcionesRestaurante.cifrarId = (req, res) => {
    let id=req.params.id;
    const token=jwt.sign({_id: id}, 'auth');
    return res.status(200).json(token);
}

funcionesRestaurante.obtenerRest = async (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;
    
    await restaurante.findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

funcionesRestaurante.editarRest = (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id;

    restaurante.findByIdAndUpdate(id, req.body)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
}

funcionesRestaurante.borrarRest = async (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id; 
    
    let rest= await restaurante.findById(id);
    

    await restaurante.findByIdAndDelete(id); 

        let empleados=[];
        let productos=[];
        let pedidos=[];
        
            empleados= await empleado.find({id_rest:id})
            for(let j=0; j<empleados.length;j++){
                let id_emp=empleados[j]._id;
                await empleado.findByIdAndDelete(id_emp);
            }
    
            productos= await stock.find({nom_rest:rest.nom_rest})
            for(let k=0; k<productos.length;k++){
                let id_prod=productos[k]._id;
                await stock.findByIdAndDelete(id_prod);
            }
    
            pedidos= await pedido.find({nom_rest:rest.nom_rest})
            for(let l=0; l<pedidos.length;l++){
                let id_pedidos=pedidos[l]._id;
                await pedido.findByIdAndDelete(id_pedidos);
            }
    
    
            return res.status(200).json('ok');
        
}

funcionesRestaurante.filtradoDueno = (req, res) => {
    let token=req.params.id;
    let tokenSplit=token.replace(/['"]+/g, '');

    const tokenDecode=jwt.decode(tokenSplit);
    const id=tokenDecode._id; 
    let nom_dueno=req.body.nom_dueno;
 
    

    restaurante.find({nom_dueno: nom_dueno, id_user:id})
        .then(
            (data) => {
                if(data.lenght == 0){
                    res.message('El dueño no existe')
                }else{
                    res.send(data);
                }
            }
        )
        .catch((error) => res.json({message: error}));
}
 
funcionesRestaurante.cargarRest = (req, res) => {
    restaurante.find() 
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
};

funcionesRestaurante.borrarRest = async (req, res) => {
    let id=req.params.id;

    let rest= await restaurante.findById(id);
    

    await restaurante.findByIdAndDelete(id); 

        let empleados=[];
        let productos=[];
        let pedidos=[];
        
            empleados= await empleado.find({id_rest:id})
            for(let j=0; j<empleados.length;j++){
                let id_emp=empleados[j]._id;
                await empleado.findByIdAndDelete(id_emp);
            }
    
            productos= await stock.find({nom_rest:rest.nom_rest})
            for(let k=0; k<productos.length;k++){
                let id_prod=productos[k]._id;
                await stock.findByIdAndDelete(id_prod);
            }
    
            pedidos= await pedido.find({nom_rest:rest.nom_rest})
            for(let l=0; l<pedidos.length;l++){
                let id_pedidos=pedidos[l]._id;
                await pedido.findByIdAndDelete(id_pedidos);
            }
    
    
            return res.status(200).json('ok');
        
}

module.exports = funcionesRestaurante; 