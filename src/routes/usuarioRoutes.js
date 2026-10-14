import {Router} from 'express'
import * as usuarioController from '../controllers/usuarioController.js'

const router = Router();

//Get usuarios
router.get('/', usuarioController.listarUsuariosController);

// Get por id
router.get('/:id', usuarioController.obtenerUsuarioPorIdController);

//Crear usuario
router.post('/', usuarioController.crearUsuarioController);

//Actualizar usuario
router.patch('/:id', usuarioController.actualizarUsuarioController);

//Eliminar usuario
router.delete('/:id', usuarioController.eliminarUsuarioController);

export default router;
