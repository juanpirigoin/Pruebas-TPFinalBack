import { Router } from 'express'
import * as notaController from '../controllers/notaController.js'
import { verificarToken } from '../middleware/verificarToken.js'
import { cargarUsuario } from '../middleware/cargarUsuario.js'
import { permitirRoles } from '../middleware/permitirRoles.js'
import { ROLES } from '../utils/constants.js'

const router = Router();

//Aca defino quien puede modificar notas
const rolesQuePuedenModificarNotas = [ROLES.DOCENTE, ROLES.ADMINISTRATIVO, ROLES.ADMIN]
//Solo usuarios con token van a acceder o modificar las notas
router.use(verificarToken, cargarUsuario);
//Definicion de permisos
const filtroPermisoModificacion = [permitirRoles(...rolesQuePuedenModificarNotas)];

// GET: cualquier usuario logueado puede ver las notas 
// el alcance se hace en el service segun rol del usuario
router.get('/', notaController.listarNotaController);
router.get('/:id', notaController.obtenerNotaPorIdController);

// POST/PATCH/DELETE: solo admin, administrativo y docente
router.post('/', ...filtroPermisoModificacion, notaController.crearNotaController);
router.patch('/:id', ...filtroPermisoModificacion, notaController.actualizarNotaController);
router.delete('/:id', ...filtroPermisoModificacion, notaController.eliminarNotaController);

export default router;
