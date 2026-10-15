import mongoose from 'mongoose'
import Materia from '../models/materia.js'
import Curso from '../models/curso.js'

//Get all materias por curso
export const listarMateriaService = async ({ idCurso } = {}) => {
    const filtro = {};
    if (idCurso) {
        filtro.idCurso = new mongoose.Types.ObjectId(idCurso.trim());
    }
    return await Materia.find(filtro).populate("idCurso", "nombre nivel turno");
}

//Get materia por id
export const obtenerMateriaPorIdService = async (id) => {
    return await Materia.findById(id).populate("idCurso", "nombre nivel turno");
}

//Create materia
export const crearMateriaService = async (materiaData) => {
    try {
        const nuevaMateria = await Materia.create(materiaData);
        return nuevaMateria;
    } catch (error) {
        throw new ErrorApp(`Error al crear la materia: ${error.message}`);
    }
}

//Update materia
export const actualizarMateriaService = async (id, materiaData) => {
    try {
        return await Materia.findByIdAndUpdate(
            { _id: id },
            materiaData,
            { new: true, runValidators: true }
        )
    } catch (error) {
        throw new ErrorApp(`Error al actualizar la materia: ${error.message}`);
    }
}

//Delete materia
export const eliminarMateriaService = async (id) => {
    try {
        return await Materia.findByIdAndDelete(id);
    } catch (error) {
        throw new ErrorApp(`Error al eliminar la materia: ${error.message}`);
    }
}
