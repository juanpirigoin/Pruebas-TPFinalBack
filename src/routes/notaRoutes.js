import { Router } from 'express'
import * as notaController from '../controllers/notaController.js'
import { verificarToken } from '../middleware/verificarToken.js'
import { cargarUsuario } from '../middleware/cargarUsuario.js'
import { permitirRoles } from '../middleware/permitirRoles.js'
import { ROLES } from '../utils/constants.js'

const router = Router();
router.use();


//Aca defino quien puede modificar notas
const rolesQuePuedenModificarNotas = [ROLES.DOCENTE, ROLES.ADMINISTRATIVO, ROLES.ADMIN]

//Verificacion de token y carga de usuario en todos los requests
const paraTodos = [verificarToken, cargarUsuario];

//Filtro para permisos
const filtroPermisos = [permitirRoles(...rolesQuePuedenModificarNotas)];

//En los Get todos tienen acceso, el alcance se hace en el service segun rol del usuario
//Get notas
router.get('/', paraTodos, notaController.listarNotaController);
//Get por id
router.get('/:id', paraTodos, notaController.obtenerNotaPorIdController);


//Los post, patch y delete solo pueden aplicarlos los docentes, administrativos y admin

//Crear nota
router.post('/', paraTodos, filtroPermisos, notaController.crearNotaController);

//Actualizar nota
router.patch('/:id', paraTodos, filtroPermisos, notaController.actualizarNotaController);

//Eliminar nota
router.delete('/:id', paraTodos, filtroPermisos, notaController.eliminarNotaController);

export default router;
