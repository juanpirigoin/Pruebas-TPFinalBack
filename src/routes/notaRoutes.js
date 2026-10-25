import { Router } from 'express'
import * as notaController from '../controllers/notaController.js'
import { verificarToken } from '../middleware/verificarToken.js'
import { cargarUsuario } from '../middleware/cargarUsuario.js'
import { permitirRoles } from '../middleware/permitirRoles.js'
import { ROLES } from '../utils/constants.js'

const router = Router();

const puedeModificarNotas = permitirRoles(ROLES.DOCENTE, ROLES.ADMINISTRATIVO, ROLES.ADMIN);


//Aplicamos verificarToken y cargarUsuario a todas las rutas
router.use(verificarToken, cargarUsuario);

//En los Get todos tienen acceso, el alcance se hace en el service segun rol del usuario
//Get notas
router.get('/', notaController.listarNotaController);
//Get por id
router.get('/:id', notaController.obtenerNotaPorIdController);


//Los post, patch y delete solo pueden aplicarlos los docentes y admin
//Crear nota
router.post('/', puedeModificarNotas, notaController.crearNotaController);

//Actualizar nota
router.patch('/:id', puedeModificarNotas, notaController.actualizarNotaController);

//Eliminar nota
router.delete('/:id', puedeModificarNotas, notaController.eliminarNotaController);

export default router;
