import {Router} from 'express'
import * as alumnoController from '../controllers/alumnoController.js'

const router = Router();

//Get alumnos
router.get('/', alumnoController.listarAlumnosController);

// Get por id
router.get('/:id', alumnoController.obtenerAlumnoPorIdController);

//Crear alumno
router.post('/', alumnoController.crearAlumnoController);

//Actualizar alumno
router.patch('/:id', alumnoController.actualizarAlumnoController);

//Eliminar alumno
router.delete('/:id', alumnoController.eliminarAlumnoController);

export default router;