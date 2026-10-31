import {Router} from 'express'
import * as cursoController from '../controllers/cursoController.js'
import { verificarToken } from '../middleware/verificarToken.js'
import { permitirRoles } from '../middleware/permitirRoles.js'
import { ROLES } from '../utils/constants.js'

const router = Router();
//Aca defino quien puede modificar cursos
const rolesQuePuedenModificarCursos = [ROLES.ADMINISTRATIVO, ROLES.ADMIN]
//Definicion de permisos
const filtroPermisoModificacion = [permitirRoles(...rolesQuePuedenModificarCursos)];
//Solo usuarios con token van a acceder o modificar los cursos
router.use(verificarToken);

// GET: cualquier usuario logueado puede ver cursos
router.get('/', cursoController.listarCursoController);
router.get('/:id', cursoController.obtenerCursoPorIdController);

// POST/PATCH/DELETE: solo admin y administrativo
router.post('/', ...filtroPermisoModificacion, cursoController.crearCursoController);
router.patch('/:id', ...filtroPermisoModificacion, cursoController.actualizarCursoController);
router.delete('/:id', ...filtroPermisoModificacion, cursoController.eliminarCursoController);

export default router;