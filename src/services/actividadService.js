import mongoose from 'mongoose'
import Actividad from '../models/actividad.js'


import Unidad from '../models/unidad.js'   //no hace falta importar?


//Get all actividades por unidad
export const listarActividadService = async ({ idUnidad } = {}) => {
    const filtro = {};
    if (idUnidad) {
        filtro.idUnidad = new mongoose.Types.ObjectId(idUnidad.trim());
    }
    return await Actividad.find(filtro).populate("idUnidad", "nombre");
}

//Get actividad por id
export const obtenerActividadPorIdService = async (id) => {
    return await Actividad.findById(id).populate("idUnidad", "nombre");
}

//Create actividad
export const crearActividadService = async (actividadData) => {
    try {
        const nuevaActividad = await Actividad.create(actividadData);
        return nuevaActividad;
    } catch (error) {

    }
}

//Update actividad
export const actualizarAlumnoService = async (id, actividadData) => {
    try {
        return Actividad.findByIdAndUpdate(
            id,
            actividadData,
            { new: true, runValidators: true }
        )
    } catch (error) {
     
    }
}

//Delete actividad
export const eliminarActividadService = async (id) => {
    try {
        return await Actividad.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Error al eliminar la actividad: ${error.message}`);
    }
}
