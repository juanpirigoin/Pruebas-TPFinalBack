import {Router} from 'express'
import * as usuarioController from '../controllers/usuarioController.js'
import { verificarToken } from '../middleware/verificarToken.js'
import { permitirRoles } from '../middleware/permitirRoles.js'
import { ROLES } from '../utils/constants.js'

const router = Router();
//Aca defino quien puede modificar usuarios
const rolesQuePuedenModificarUsuarios = [ROLES.ADMINISTRATIVO, ROLES.ADMIN]
//Definicion de permisos
const filtroPermisoModificacion = [permitirRoles(...rolesQuePuedenModificarUsuarios)];
//Solo usuarios con token van a acceder o modificar las usuarios
router.use(verificarToken);

// GET: cualquier usuario logueado puede ver usuarios
router.get('/', usuarioController.listarUsuarioController);
router.get('/:id', usuarioController.obtenerUsuarioPorIdController);

// POST/PATCH/DELETE: solo admin y administrativo
router.post('/', ...filtroPermisoModificacion, usuarioController.crearUsuarioController);
router.patch('/:id', ...filtroPermisoModificacion, usuarioController.actualizarUsuarioController);
router.delete('/:id', ...filtroPermisoModificacion, usuarioController.eliminarUsuarioController);

export default router;
