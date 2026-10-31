import {Router} from 'express'
import * as alumnoController from '../controllers/alumnoController.js'
import { verificarToken } from '../middleware/verificarToken.js'
import { permitirRoles } from '../middleware/permitirRoles.js'
import { ROLES } from '../utils/constants.js'

const router = Router();
//Aca defino quien puede modificar actividades
const rolesQuePuedenModificarAlumnos = [ROLES.ADMINISTRATIVO, ROLES.ADMIN]
//Definicion de permisos
const filtroPermisoModificacion = [permitirRoles(...rolesQuePuedenModificarAlumnos)];
//Solo usuarios con token van a acceder o modificar las actividades
router.use(verificarToken);


// GET: cualquier usuario logueado puede ver alumnos
router.get('/', alumnoController.listarAlumnoController);
router.get('/:id', alumnoController.obtenerAlumnoPorIdController);

// POST/PATCH/DELETE: solo admin y administrativo
router.post('/', ...filtroPermisoModificacion, alumnoController.crearAlumnoController);
router.patch('/:id', ...filtroPermisoModificacion, alumnoController.actualizarAlumnoController);
router.delete('/:id', ...filtroPermisoModificacion, alumnoController.eliminarAlumnoController);

export default router;