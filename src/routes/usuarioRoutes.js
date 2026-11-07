import {Router} from 'express'
import * as usuarioController from '../controllers/usuarioController.js'
import { verificarToken } from '../middleware/verificarToken.js'
import { permitirRoles } from '../middleware/permitirRoles.js'
import { ROLES } from '../utils/constants.js'

const router = Router();
// Roles autorizados para gestionar usuarios (lectura y modificación)
const rolesAutorizados = [ROLES.ADMIN, ROLES.ADMINISTRATIVO];
const filtroPermisos = [permitirRoles(...rolesAutorizados)];

// Solo usuarios con token van a acceder
router.use(verificarToken);

// GET: solo admin y administrativo
router.get('/', ...filtroPermisos, usuarioController.listarUsuarioController);
router.get('/:id', ...filtroPermisos, usuarioController.obtenerUsuarioPorIdController);

// POST/PATCH/DELETE: solo admin y administrativo
router.post('/', ...filtroPermisos, usuarioController.crearUsuarioController);
router.patch('/:id', ...filtroPermisos, usuarioController.actualizarUsuarioController);
router.delete('/:id', ...filtroPermisos, usuarioController.eliminarUsuarioController);

export default router;
