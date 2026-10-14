import {Router} from 'express'
import * as unidadController from '../controllers/unidadController.js'

const router = Router();

//Get unidades
router.get('/', unidadController.listarUnidadesController);

// Get por id
router.get('/:id', unidadController.obtenerUnidadPorIdController);

//Crear unidad
router.post('/', unidadController.crearUnidadController);

//Actualizar unidad
router.patch('/:id', unidadController.actualizarUnidadController);

//Eliminar unidad
router.delete('/:id', unidadController.eliminarUnidadController);

export default router;
