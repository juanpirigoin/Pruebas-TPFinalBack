import {Router} from 'express'
import * as asistenciaController from '../controllers/asistenciaController.js'
import { verificarToken } from '../middleware/verificarToken.js'
import { permitirRoles } from '../middleware/permitirRoles.js'
import { ROLES } from '../utils/constants.js'

const router = Router();
//Aca defino quien puede modificar asistencias
const rolesQuePuedenModificarAsistencias = [ROLES.ADMINISTRATIVO, ROLES.ADMIN, ROLES.DOCENTE]
//Definicion de permisos
const filtroPermisoModificacion = [permitirRoles(...rolesQuePuedenModificarAsistencias)];
//Solo usuarios con token van a acceder o modificar las asistencias
router.use(verificarToken);

// GET: cualquier usuario logueado puede ver asistencias
router.get('/', asistenciaController.listarAsistenciaController);
router.get('/:id', asistenciaController.obtenerAsistenciaPorIdController);

// POST/PATCH/DELETE: solo admin, administrativo y docente
router.post('/', ...filtroPermisoModificacion, asistenciaController.crearAsistenciaController);
router.patch('/:id', ...filtroPermisoModificacion, asistenciaController.actualizarAsistenciaController);
router.delete('/:id', ...filtroPermisoModificacion, asistenciaController.eliminarAsistenciaController);

export default router;
