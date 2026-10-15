import mongoose from 'mongoose'
import Evaluacion from '../models/evaluacion.js'
import Unidad from '../models/unidad.js'

//Get all evaluaciones por unidad
export const listarEvaluacionService = async ({ idUnidad } = {}) => {
    const filtro = {};
    if (idUnidad) {
        filtro.idUnidad = new mongoose.Types.ObjectId(idUnidad.trim());
    }
    return await Evaluacion.find(filtro).populate("idUnidad", "nombre");
}

//Get evaluacion por id
export const obtenerEvaluacionPorIdService = async (id) => {
    return await Evaluacion.findById(id).populate("idUnidad", "nombre");
}

//Create evaluacion
export const crearEvaluacionService = async (evaluacionData) => {
    try {
        const nuevaEvaluacion = await Evaluacion.create(evaluacionData);
        return nuevaEvaluacion;
    } catch (error) {
        throw new ErrorApp(`Error al crear la evaluación: ${error.message}`);
    }
}

//Update evaluacion
export const actualizarEvaluacionService = async (id, evaluacionData) => {
    try {
        return await Evaluacion.findByIdAndUpdate(
            { _id: id },
            evaluacionData,
            { new: true, runValidators: true }
        )
    } catch (error) {
        throw new ErrorApp(`Error al actualizar la evaluación: ${error.message}`);
    }
}

//Delete evaluacion
export const eliminarEvaluacionService = async (id) => {
    try {
        return await Evaluacion.findByIdAndDelete(id);
    } catch (error) {
        throw new ErrorApp(`Error al eliminar la evaluación: ${error.message}`);
    }
}
