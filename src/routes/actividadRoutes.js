import {Router} from 'express'
import * as actividadController from '../controllers/actividadController.js'
import { verificarToken } from '../middleware/verificarToken.js'
import { cargarUsuario } from '../middleware/cargarUsuario.js'
import { permitirRoles } from '../middleware/permitirRoles.js'
import { ROLES } from '../utils/constants.js'

const router = Router();
//Aca defino quien puede modificar actividades
const rolesQuePuedenModificarActividades = [ROLES.DOCENTE, ROLES.ADMINISTRATIVO, ROLES.ADMIN]
//Definicion de permisos
const filtroPermisoModificacion = [permitirRoles(...rolesQuePuedenModificarActividades)];
//Solo usuarios con token van a acceder o modificar las actividades
router.use(verificarToken, cargarUsuario);

// GET: cualquier usuario logueado puede ver actividades
router.get('/', actividadController.listarActividadController);
router.get('/:id', actividadController.obtenerActividadPorIdController);

// POST/PATCH/DELETE: solo admin, administrativo y docente
router.post('/', ...filtroPermisoModificacion, actividadController.crearActividadController);
router.patch('/:id', ...filtroPermisoModificacion, actividadController.actualizarActividadController);
router.delete('/:id', ...filtroPermisoModificacion, actividadController.eliminarActividadController);

export default router;