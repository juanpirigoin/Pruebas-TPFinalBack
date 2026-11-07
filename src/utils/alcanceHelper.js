import Alumno from '../models/alumnoModel.js'
import Materia from '../models/materiaModel.js'
import Unidad from '../models/unidadModel.js'
import { ROLES } from './constants.js'
import { ErrorApp } from './ErrorApp.js'

/**
 * Obtiene la lista de ObjectIds de materias a las que el usuario tiene acceso según su rol:
 * - ADMIN / ADMINISTRATIVO: null (acceso total a todas las materias)
 * - DOCENTE: materias asignadas en usuario.idMateria
 * - ALUMNO / PADRE: materias correspondientes al curso de los alumnos asociados en usuario.idAlumno
 * - Cualquier otro rol no reconocido: [] (sin acceso)
 *
 * @param {Object} usuario Documento del usuario autenticado
 * @returns {Promise<Array<import('mongoose').Types.ObjectId>|null>}
 */
export const obtenerMateriasPermitidasPorUsuario = async (usuario) => {
    if (!usuario) return [];

    switch (usuario.rol) {
        case ROLES.ADMIN:
        case ROLES.ADMINISTRATIVO:
            return null;

        case ROLES.DOCENTE:
            return usuario.idMateria || [];

        case ROLES.ALUMNO: {
            const idAlumno = usuario.idAlumno?.[0];
            if (!idAlumno) return [];

            // El alumno pertenece a un único curso
            const alumno = await Alumno.findById(idAlumno).select("idCurso").lean();
            if (!alumno?.idCurso) return [];

            // Obtenemos las materias de su curso
            const materias = await Materia.find({ idCurso: alumno.idCurso }).select("_id").lean();
            return materias.map(m => m._id);
        }

        case ROLES.PADRE: {
            if (!usuario.idAlumno || usuario.idAlumno.length === 0) return [];

            // Un padre puede tener uno o varios hijos en distintos cursos
            const hijos = await Alumno.find({ _id: { $in: usuario.idAlumno } }).select("idCurso").lean();
            const idsCursos = hijos.map(h => h.idCurso).filter(Boolean);
            if (idsCursos.length === 0) return [];

            // Obtenemos las materias de los cursos de todos sus hijos
            const materias = await Materia.find({ idCurso: { $in: idsCursos } }).select("_id").lean();
            return materias.map(m => m._id);
        }

        default:
            return [];
    }
};

/**
 * Obtiene la lista de ObjectIds de unidades a las que el usuario tiene acceso según su rol:
 * - ADMIN / ADMINISTRATIVO: null (acceso total a todas las unidades)
 * - DOCENTE, ALUMNO, PADRE: unidades pertenecientes a sus materias permitidas
 * - Cualquier otro rol no reconocido: [] (sin acceso)
 *
 * @param {Object} usuario Documento del usuario autenticado
 * @returns {Promise<Array<import('mongoose').Types.ObjectId>|null>}
 */
export const obtenerUnidadesPermitidasPorUsuario = async (usuario) => {
    const materiasPermitidas = await obtenerMateriasPermitidasPorUsuario(usuario);
    if (materiasPermitidas === null) {
        return null; // Acceso total, no requiere filtrar por unidad
    }
    if (materiasPermitidas.length === 0) {
        return [];
    }
    const unidades = await Unidad.find({ idMateria: { $in: materiasPermitidas } }).select("_id").lean();
    return unidades.map(u => u._id);
};

/**
 * Retorna el filtro de MongoDB para colecciones que se relacionan con idUnidad
 * (como Actividades y Evaluaciones).
 *
 * @param {Object} usuario Documento del usuario autenticado
 * @returns {Promise<Object>} Filtro listo para usar en Mongoose
 */
export const obtenerFiltroAlcanceUnidad = async (usuario) => {
    const unidadesPermitidas = await obtenerUnidadesPermitidasPorUsuario(usuario);
    if (unidadesPermitidas === null) {
        return {};
    }
    return { idUnidad: { $in: unidadesPermitidas } };
};

/**
 * Valida si un docente tiene asignada la materia a la que pertenece la unidad indicada.
 * Lanza ErrorApp 400 si falta idUnidad, 404 si la unidad no existe, o 403 si el docente no la dicta.
 *
 * @param {string|import('mongoose').Types.ObjectId} idUnidad ID de la unidad
 * @param {Object} usuario Usuario autenticado
 * @param {string} [tipoRecurso="este recurso"] Nombre del recurso para el mensaje de error
 */
export const validarUnidadDocente = async (idUnidad, usuario, tipoRecurso = "este recurso") => {
    if (usuario.rol !== ROLES.DOCENTE) return;

    if (!idUnidad) {
        throw new ErrorApp("La unidad es obligatoria", 400);
    }

    const unidad = await Unidad.findById(idUnidad);
    if (!unidad) {
        throw new ErrorApp("Unidad no encontrada", 404);
    }

    const esMateriaValida = (usuario.idMateria || []).some(
        m => m.toString() === unidad.idMateria.toString()
    );

    if (!esMateriaValida) {
        throw new ErrorApp(`No tiene permisos para operar sobre ${tipoRecurso} de esta materia`, 403);
    }
};

