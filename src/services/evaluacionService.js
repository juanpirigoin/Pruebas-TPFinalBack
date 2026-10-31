import mongoose from 'mongoose'
import Evaluacion from '../models/evaluacion.js'
import Unidad from '../models/unidad.js'
import { ErrorApp } from '../utils/ErrorApp.js'
import { ROLES } from '../utils/constants.js'

// Estructuración de evaluaciones
const formatearEvaluacion = evaluacion => ({
    _id: evaluacion._id,
    nombre: evaluacion.nombre,
    tipo: evaluacion.tipo,
    fecha: evaluacion.fecha,

    unidad: evaluacion.idUnidad
});

const alcanceDeEvaluaciones = async (usuario) => {
    switch (usuario.rol) {
        case ROLES.DOCENTE: {
            const unidades = await Unidad.find({ idMateria: { $in: usuario.idMateria } }).select("_id");
            const idsUnidades = unidades.map(u => u._id);
            return { idUnidad: { $in: idsUnidades } };
        }
        default:
            return {};
    }
};

const validarUnidadDocente = async (idUnidad, usuario) => {
    if (usuario.rol !== ROLES.DOCENTE) return;

    if (!idUnidad) {
        throw new ErrorApp("La unidad es obligatoria", 400);
    }

    const unidad = await Unidad.findById(idUnidad);
    if (!unidad) {
        throw new ErrorApp("Unidad no encontrada", 404);
    }

    const esMateriaValida = usuario.idMateria.some(
        m => m.toString() === unidad.idMateria.toString()
    );

    if (!esMateriaValida) {
        throw new ErrorApp("No tiene permisos para operar sobre las evaluaciones de esta materia", 403);
    }
};

// Get todas las evaluaciones por unidad (con filtro de alcance)
export const listarEvaluacionService = async (usuario, filtros = {}) => {
    const { idUnidad, ...otrosFiltros } = filtros;
    const filtroAlcance = await alcanceDeEvaluaciones(usuario);
    const filtro = { ...otrosFiltros };

    if (idUnidad) {
        if (usuario.rol === ROLES.DOCENTE) {
            const idsPermitidos = (filtroAlcance.idUnidad?.$in || []).map(id => id.toString());
            if (!idsPermitidos.includes(idUnidad.trim())) {
                return [];
            }
        }
        filtro.idUnidad = new mongoose.Types.ObjectId(idUnidad.trim());
    } else {
        Object.assign(filtro, filtroAlcance);
    }

    const evaluaciones = await Evaluacion.find(filtro)
        .populate("idUnidad", "nombre")
        .sort({ fecha: 1 })
        .lean();

    return evaluaciones.map(formatearEvaluacion);
};

// Get evaluacion por id
export const obtenerEvaluacionPorIdService = async (id, usuario) => {
    const filtroAlcance = await alcanceDeEvaluaciones(usuario);
    const evaluacion = await Evaluacion.findOne({ _id: id, ...filtroAlcance })
        .populate("idUnidad", "nombre")
        .lean();

    if (!evaluacion) {
        return null;
    }

    return formatearEvaluacion(evaluacion);
};

// Create evaluacion
export const crearEvaluacionService = async (evaluacionData, usuario) => {
    await validarUnidadDocente(evaluacionData.idUnidad, usuario);
    return await Evaluacion.create(evaluacionData);
};

// Update evaluacion
export const actualizarEvaluacionService = async (id, evaluacionData, usuario) => {
    if (evaluacionData.idUnidad) {
        await validarUnidadDocente(evaluacionData.idUnidad, usuario);
    }

    const filtroAlcance = await alcanceDeEvaluaciones(usuario);

    return await Evaluacion.findOneAndUpdate(
        {
            _id: id,
            ...filtroAlcance
        },
        evaluacionData,
        {
            returnDocument: "after",
            runValidators: true
        }
    );
};

// Delete evaluacion
export const eliminarEvaluacionService = async (id, usuario) => {
    const filtroAlcance = await alcanceDeEvaluaciones(usuario);

    return await Evaluacion.findOneAndDelete({
        _id: id,
        ...filtroAlcance
    });
};
