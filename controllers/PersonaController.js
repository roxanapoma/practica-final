const { app, constants } = require('../config');
const { PersonaModel } = require('../models');
const axios = require('axios');

const listarPersonas = async (req, res) => {
  const listaPersonas = await PersonaModel.find();
  console.log('============> DESDE_LISTAR_PERSONAS_ ');
  console.log(listaPersonas);

  res.status(200).json({
    finalizado: true,
    mensaje: 'Personas listadas correctamente',
    datos: listaPersonas
  });
};

const registrarPersona = async (req, res) => {
  const datos = req.body;
  const personaCreada = await PersonaModel.create(datos);
  console.log(personaCreada);
  res.status(201).json({
    finalizado: true,
    mensaje: 'Persona registrada correctamente.',
    datos: personaCreada
  });
};

const modificarPersona = async (req, res) => {
  const persona = {
    nombres: req.body.nombres,
    apellidoPaterno: req.body.apellidoPaterno,
    apellidoMaterno: req.body.apellidoMaterno,
    numeroDocumento: req.body.numeroDocumento
  }
  PersonaModel.findByIdAndUpdate(req.params.id, {$set:persona}, {new:true},(err, data) => {
    if (!err) {
      res.status(200).json({
        finalizado: true,
        mensaje: 'Persona modificada correctamente',
        data: data
      })
    }else{
      res.status(400).json({
        finalizado: false,
        mensaje: 'ERROR',
        data: err
      })
    }
  });
 
};

const eliminarPersona = async (req, res) => {
 
  console.log('Ingresando a eliminar'+ req.params.id);
  PersonaModel.findOneAndRemove(req.params.id, (err, data)=>{
    if(!err){
      res.status(200).json({
        finalizado: true,
        mensaje: 'Persona eliminada con exito',
        datos: true
      });
    }else{
      res.status(400).json({
        finalizado: false,
        mensaje: 'ERROR',
        datos: err
      })
    }
  });

};

const generarToken = (req, res) => {
  console.log(constants);
  res.status(200).json({
    finalizado: true,
    mensaje: 'Token generado correctamente',
    datos: `e1e5wq61d56qw1dwq156dwq1655dwq6 TIEMPO ${app.expiracionToken}`
  });
};

const consumirServicio = async (req, res) => {
  const init = {
    method: 'GET',
    url: 'https://restcountries.eu/rest/v2/all'
  };

  const respuesta = await axios(init);
  console.log(respuesta.data);
  res.status(200).json({
    finalizado: true,
    mensaje: 'Servicio consumido correctamente',
    datos: respuesta.data
  });
}


module.exports = {
  listarPersonas,
  generarToken,
  registrarPersona,
  modificarPersona,
  eliminarPersona,
  consumirServicio
};