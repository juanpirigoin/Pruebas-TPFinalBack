import {Router} from 'express'
import * as materiaController from '../controllers/materiaController.js'

const router = Router();

//Get materias
router.get('/', materiaController.listarMateriaController);

// Get por id
router.get('/:id', materiaController.obtenerMateriaPorIdController);

//Crear materia
router.post('/', materiaController.crearMateriaController);

//Actualizar materia
router.patch('/:id', materiaController.actualizarMateriaController);

//Eliminar materia
router.delete('/:id', materiaController.eliminarMateriaController);

export default router;
