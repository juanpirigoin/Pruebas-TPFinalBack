import mongoose from 'mongoose'
import Materia from '../models/materia.js'

// Get all materias por curso
export const listarMateriaService = async ({ idCurso } = {}) => {
    const filtro = {};
    if (idCurso) {
        filtro.idCurso = new mongoose.Types.ObjectId(idCurso.trim());
    }
    return await Materia.find(filtro).populate("idCurso", "nombre nivel turno");
}

// Get materia por id
export const obtenerMateriaPorIdService = async (id) => {
    return await Materia.findById(id).populate("idCurso", "nombre nivel turno");
}

// Create materia
export const crearMateriaService = async (materiaData) => {
    return await Materia.create(materiaData);
}

// Update materia
export const actualizarMateriaService = async (id, materiaData) => {
    return await Materia.findByIdAndUpdate(
        id,
        materiaData,
        { returnDocument: "after", runValidators: true }
    );
}

// Delete materia
export const eliminarMateriaService = async (id) => {
    return await Materia.findByIdAndDelete(id);
}
