import { Router } from 'express'
import * as alumnoController from '../controllers/alumnoController.js'
import { verificarToken } from '../middleware/verificarToken.js'
import { permitirRoles } from '../middleware/permitirRoles.js'
import { ROLES } from '../utils/constants.js'

const router = Router();

// Roles que pueden consultar alumnos (gestión escolar)
const rolesLectura = [ROLES.ADMIN, ROLES.ADMINISTRATIVO, ROLES.DOCENTE];
// Roles que pueden modificar alumnos
const rolesModificacion = [ROLES.ADMIN, ROLES.ADMINISTRATIVO];

// Requiere token para todas las rutas
router.use(verificarToken);

// GET: solo admin, administrativo y docente
router.get('/', permitirRoles(...rolesLectura), alumnoController.listarAlumnoController);
router.get('/:id', permitirRoles(...rolesLectura), alumnoController.obtenerAlumnoPorIdController);

// POST/PATCH/DELETE: solo admin y administrativo
router.post('/', permitirRoles(...rolesModificacion), alumnoController.crearAlumnoController);
router.patch('/:id', permitirRoles(...rolesModificacion), alumnoController.actualizarAlumnoController);
router.delete('/:id', permitirRoles(...rolesModificacion), alumnoController.eliminarAlumnoController);

export default router;
