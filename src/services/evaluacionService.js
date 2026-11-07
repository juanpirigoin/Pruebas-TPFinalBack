import mongoose from 'mongoose'
import Evaluacion from '../models/evaluacionModel.js'
import Unidad from '../models/unidadModel.js'
import { obtenerFiltroAlcanceUnidad, validarUnidadDocente } from '../utils/alcanceHelper.js'

// Estructuración de evaluaciones
const formatearEvaluacion = evaluacion => ({
    _id: evaluacion._id,
    nombre: evaluacion.nombre,
    tipo: evaluacion.tipo,
    fecha: evaluacion.fecha,
    unidad: evaluacion.idUnidad
});

// Get todas las evaluaciones por unidad (con filtro de alcance)
export const listarEvaluacionService = async (usuario, filtros = {}) => {
    const { idUnidad, ...otrosFiltros } = filtros;
    const filtroAlcance = await obtenerFiltroAlcanceUnidad(usuario);
    const filtro = { ...otrosFiltros };

    if (idUnidad) {
        if (filtroAlcance.idUnidad?.$in) {
            const idsPermitidos = filtroAlcance.idUnidad.$in.map(id => id.toString());
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
    const filtroAlcance = await obtenerFiltroAlcanceUnidad(usuario);
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
    await validarUnidadDocente(evaluacionData.idUnidad, usuario, "las evaluaciones");
    return await Evaluacion.create(evaluacionData);
};

// Update evaluacion
export const actualizarEvaluacionService = async (id, evaluacionData, usuario) => {
    if (evaluacionData.idUnidad) {
        await validarUnidadDocente(evaluacionData.idUnidad, usuario, "las evaluaciones");
    }

    const filtroAlcance = await obtenerFiltroAlcanceUnidad(usuario);

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
    const filtroAlcance = await obtenerFiltroAlcanceUnidad(usuario);

    return await Evaluacion.findOneAndDelete({
        _id: id,
        ...filtroAlcance
    });
};
