import {Router} from 'express'
import * as materiaController from '../controllers/materiaController.js'
import { verificarToken } from '../middleware/verificarToken.js'
import { permitirRoles } from '../middleware/permitirRoles.js'
import { ROLES } from '../utils/constants.js'

const router = Router();
//Aca defino quien puede modificar actividades
const rolesQuePuedenModificarMaterias = [ROLES.ADMINISTRATIVO, ROLES.ADMIN]
//Definicion de permisos
const filtroPermisoModificacion = [permitirRoles(...rolesQuePuedenModificarMaterias)];
//Solo usuarios con token van a acceder o modificar las materias
router.use(verificarToken);

// GET: cualquier usuario logueado puede ver materias
router.get('/', materiaController.listarMateriaController);
router.get('/:id', materiaController.obtenerMateriaPorIdController);

// POST/PATCH/DELETE: solo admin y administrativo
router.post('/', ...filtroPermisoModificacion, materiaController.crearMateriaController);
router.patch('/:id', ...filtroPermisoModificacion, materiaController.actualizarMateriaController);
router.delete('/:id', ...filtroPermisoModificacion, materiaController.eliminarMateriaController);

export default router;
