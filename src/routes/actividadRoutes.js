import {Router} from 'express'
import * as actividadController from '../controllers/actividadController.js'

const router = Router();

//Get actividades
router.get('/', actividadController.listarActividadesController);

// Get por id
router.get('/:id', actividadController.obtenerActividadPorIdController);

//Crear actividad
router.post('/', actividadController.crearActividadController);

//Actualizar actividad
router.patch('/:id', actividadController.actualizarActividadController);

//Eliminar actividad
router.delete('/:id', actividadController.eliminarActividadController);

export default router;