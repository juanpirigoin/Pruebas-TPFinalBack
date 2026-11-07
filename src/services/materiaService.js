import mongoose from 'mongoose'
import Materia from '../models/materiaModel.js'
import Curso from '../models/cursoModel.js'
import { obtenerMateriasPermitidasPorUsuario } from '../utils/alcanceHelper.js'

const alcanceDeMaterias = async (usuario) => {
    const materiasPermitidas = await obtenerMateriasPermitidasPorUsuario(usuario);
    if (materiasPermitidas === null) {
        return {};
    }
    return { _id: { $in: materiasPermitidas } };
};

// Get all materias por curso (con filtro de alcance)
export const listarMateriaService = async (usuario, { idCurso } = {}) => {
    const filtroAlcance = await alcanceDeMaterias(usuario);
    const filtro = { ...filtroAlcance };
    if (idCurso) {
        filtro.idCurso = new mongoose.Types.ObjectId(idCurso.trim());
    }
    return await Materia.find(filtro).populate("idCurso", "nombre nivel turno");
}

// Get materia por id (con filtro de alcance)
export const obtenerMateriaPorIdService = async (id, usuario) => {
    const filtroAlcance = await alcanceDeMaterias(usuario);
    return await Materia.findOne({ _id: id, ...filtroAlcance }).populate("idCurso", "nombre nivel turno");
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
