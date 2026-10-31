import { Router } from 'express'
import * as asistenciaController from '../controllers/asistenciaController.js'
import { verificarToken } from '../middleware/verificarToken.js'
import { cargarUsuario } from '../middleware/cargarUsuario.js'
import { permitirRoles } from '../middleware/permitirRoles.js'
import { ROLES } from '../utils/constants.js'

const router = Router();
// Aca defino quien puede modificar asistencias (solo preceptoría / gestión escolar)
const rolesQuePuedenModificarAsistencias = [ROLES.ADMINISTRATIVO, ROLES.ADMIN];
// Definicion de permisos
const filtroPermisoModificacion = [permitirRoles(...rolesQuePuedenModificarAsistencias)];
// Requiere token y carga usuario para verificar alcances
router.use(verificarToken, cargarUsuario);

// GET: cualquier usuario autenticado puede ver asistencias dentro de su alcance
router.get('/', asistenciaController.listarAsistenciaController);
router.get('/:id', asistenciaController.obtenerAsistenciaPorIdController);

// POST/PATCH/DELETE: solo admin y administrativo
router.post('/', ...filtroPermisoModificacion, asistenciaController.crearAsistenciaController);
router.patch('/:id', ...filtroPermisoModificacion, asistenciaController.actualizarAsistenciaController);
router.delete('/:id', ...filtroPermisoModificacion, asistenciaController.eliminarAsistenciaController);

export default router;
