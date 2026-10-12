import {Router} from 'express'
import * as asistenciaController from '../controllers/asistenciaController.js'

const router = Router();

//Get asistencias
router.get('/', asistenciaController.listarAsistenciasController);

// Get por id
router.get('/:id', asistenciaController.obtenerAsistenciaPorIdController);

//Crear asistencia
router.post('/', asistenciaController.crearAsistenciaController);

//Actualizar asistencia
router.patch('/:id', asistenciaController.actualizarAsistenciaController);

//Eliminar asistencia
router.delete('/:id', asistenciaController.eliminarAsistenciaController);

export default router;
