import {Router} from 'express'
import * as evaluacionController from '../controllers/evaluacionController.js'

const router = Router();

//Get evaluaciones
router.get('/', evaluacionController.listarEvaluacionesController);

// Get por id
router.get('/:id', evaluacionController.obtenerEvaluacionPorIdController);

//Crear evaluacion
router.post('/', evaluacionController.crearEvaluacionController);

//Actualizar evaluacion
router.patch('/:id', evaluacionController.actualizarEvaluacionController);

//Eliminar evaluacion
router.delete('/:id', evaluacionController.eliminarEvaluacionController);

export default router;
