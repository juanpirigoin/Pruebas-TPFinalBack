import Curso from '../models/curso.js'

// Get all cursos
export const listarCursoService = async () => {
    return await Curso.find();
}

// Get curso por id
export const obtenerCursoPorIdService = async (id) => {
    return await Curso.findById(id);
}

// Create curso
export const crearCursoService = async (cursoData) => {
    return await Curso.create(cursoData);
}

// Update curso
export const actualizarCursoService = async (id, cursoData) => {
    return await Curso.findByIdAndUpdate(
        id,
        cursoData,
        { returnDocument: "after", runValidators: true }
    );
}

// Delete curso
export const eliminarCursoService = async (id) => {
    return await Curso.findByIdAndDelete(id);
}
