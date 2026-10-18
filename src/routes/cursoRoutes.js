import {Router} from 'express'
import * as cursoController from '../controllers/cursoController.js'

const router = Router();

//Get cursos
router.get('/', cursoController.listarCursoController);

// Get por id
router.get('/:id', cursoController.obtenerCursoPorIdController);

//Crear cruso
router.post('/', cursoController.crearCursoController);

//Actualizar curso
router.patch('/:id', cursoController.actualizarCursoController);

//Eliminar curso
router.delete('/:id', cursoController.eliminarCursoController);

export default router;