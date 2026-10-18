import {Router} from 'express'
import * as notaController from '../controllers/notaController.js'

const router = Router();

//Get notas
router.get('/', notaController.listarNotaController);

// Get por id
router.get('/:id', notaController.obtenerNotaPorIdController);

//Crear nota
router.post('/', notaController.crearNotaController);

//Actualizar nota
router.patch('/:id', notaController.actualizarNotaController);

//Eliminar nota
router.delete('/:id', notaController.eliminarNotaController);

export default router;
