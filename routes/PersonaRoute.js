const express = require('express');
const router = express.Router();
const { PersonaController } = require('../controllers');
const { AuthMiddleware } = require('../middlewares');

router.get('/listar/personas', PersonaController.listarPersonas);

router.get('/consumir-servicio', PersonaController.consumirServicio)

router.post('/registrar/personas', PersonaController.registrarPersona);

router.put('/modificar/personas/:id', PersonaController.modificarPersona);

router.delete('/eliminar/personas/:id', PersonaController.eliminarPersona);

router.get('/token', PersonaController.generarToken)

module.exports = router;