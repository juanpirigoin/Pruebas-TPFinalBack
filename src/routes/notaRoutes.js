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

//En los Get todos tienen acceso con token, el alcance se hace en el service segun rol del usuario
//Get notas
router.get('/', notaController.listarNotaController);
//Get por id
router.get('/:id', notaController.obtenerNotaPorIdController);


//Los post, patch y delete solo pueden aplicarlos los docentes, administrativos y admin
//Crear nota
router.post('/', filtroPermisoModificacion, notaController.crearNotaController);

//Actualizar nota
router.patch('/:id', filtroPermisoModificacion, notaController.actualizarNotaController);

//Eliminar nota
router.delete('/:id', filtroPermisoModificacion, notaController.eliminarNotaController);

export default router;
