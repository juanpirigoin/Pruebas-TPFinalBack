import { Router } from 'express'
import * as evaluacionController from '../controllers/evaluacionController.js'
import { verificarToken } from '../middleware/verificarToken.js'
import { cargarUsuario } from '../middleware/cargarUsuario.js'
import { permitirRoles } from '../middleware/permitirRoles.js'
import { ROLES } from '../utils/constants.js'

const router = Router();
//Aca defino quien puede modificar evaluaciones
const rolesQuePuedenModificarEvaluaciones = [ROLES.ADMINISTRATIVO, ROLES.ADMIN, ROLES.DOCENTE]
//Definicion de permisos
const filtroPermisoModificacion = [permitirRoles(...rolesQuePuedenModificarEvaluaciones)];
//Solo usuarios con token van a acceder o modificar las evaluaciones
router.use(verificarToken, cargarUsuario);

// GET: cualquier usuario logueado puede ver evaluaciones
router.get('/', evaluacionController.listarEvaluacionController);
router.get('/:id', evaluacionController.obtenerEvaluacionPorIdController);

// POST/PATCH/DELETE: solo admin, administrativo y docente
router.post('/', ...filtroPermisoModificacion, evaluacionController.crearEvaluacionController);
router.patch('/:id', ...filtroPermisoModificacion, evaluacionController.actualizarEvaluacionController);
router.delete('/:id', ...filtroPermisoModificacion, evaluacionController.eliminarEvaluacionController);

export default router;
