import mongoose from 'mongoose'
import Unidad from '../models/unidad.js'
import Materia from '../models/materia.js'

//Get all unidades por materia
export const listarUnidadService = async ({ idMateria } = {}) => {
    const filtro = {};
    if (idMateria) {
        filtro.idMateria = new mongoose.Types.ObjectId(idMateria.trim());
    }
    return await Unidad.find(filtro).populate("idMateria", "nombre");
}

//Get unidad por id
export const obtenerUnidadPorIdService = async (id) => {
    return await Unidad.findById(id).populate("idMateria", "nombre");
}

//Create unidad
export const crearUnidadService = async (unidadData) => {
    try {
        const nuevaUnidad = await Unidad.create(unidadData);
        return nuevaUnidad;
    } catch (error) {
        throw new ErrorApp(`Error al crear la unidad: ${error.message}`);
    }
}

//Update unidad
export const actualizarUnidadService = async (id, unidadData) => {
    try {
        return await Unidad.findByIdAndUpdate(
            { _id: id },
            unidadData,
            { new: true, runValidators: true }
        )
    } catch (error) {
        throw new ErrorApp(`Error al actualizar la unidad: ${error.message}`);
    }
}

//Delete unidad
export const eliminarUnidadService = async (id) => {
    try {
        return await Unidad.findByIdAndDelete(id);
    } catch (error) {
        throw new ErrorApp(`Error al eliminar la unidad: ${error.message}`);
    }
}
