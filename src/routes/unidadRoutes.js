import {Router} from 'express'
import * as unidadController from '../controllers/unidadController.js'
import { verificarToken } from '../middleware/verificarToken.js'
import { permitirRoles } from '../middleware/permitirRoles.js'
import { ROLES } from '../utils/constants.js'

const router = Router();
//Aca defino quien puede modificar actividades
const rolesQuePuedenModificarUnidades = [ROLES.ADMINISTRATIVO, ROLES.ADMIN, ROLES.DOCENTE]
//Definicion de permisos
const filtroPermisoModificacion = [permitirRoles(...rolesQuePuedenModificarUnidades)];
//Solo usuarios con token van a acceder o modificar las unidades
router.use(verificarToken);

// GET: cualquier usuario logueado puede ver unidades
router.get('/', unidadController.listarUnidadController);
router.get('/:id', unidadController.obtenerUnidadPorIdController);

// POST/PATCH/DELETE: solo admin, administrativo y docente
router.post('/', ...filtroPermisoModificacion, unidadController.crearUnidadController);
router.patch('/:id', ...filtroPermisoModificacion, unidadController.actualizarUnidadController);
router.delete('/:id', ...filtroPermisoModificacion, unidadController.eliminarUnidadController);

export default router;
