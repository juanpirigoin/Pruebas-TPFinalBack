import mongoose from 'mongoose'
import Nota from '../models/nota.js'
import Alumno from '../models/alumno.js'
import Materia from '../models/materia.js'
import Actividad from '../models/actividad.js'
import Evaluacion from '../models/evaluacion.js'

//Get all notas
export const listarNotasService = async ({ idAlumno, idMateria, idActividad, idEvaluacion } = {}) => {
    const filtro = {};
    if (idAlumno) {
        filtro.idAlumno = new mongoose.Types.ObjectId(idAlumno.trim());
    }
    if (idMateria) {
        filtro.idMateria = new mongoose.Types.ObjectId(idMateria.trim());
    }
    if (idActividad) {
        filtro.idActividad = new mongoose.Types.ObjectId(idActividad.trim());
    }
    if (idEvaluacion) {
        filtro.idEvaluacion = new mongoose.Types.ObjectId(idEvaluacion.trim());
    }
    return await Nota.find(filtro)
        .populate("idAlumno", "nombre apellido")
        .populate("idMateria", "nombre")
        .populate("idActividad", "nombre")
        .populate("idEvaluacion", "nombre");
}

//Get nota por id
export const obtenerNotaPorIdService = async (id) => {
    return await Nota.findById(id)
        .populate("idAlumno", "nombre apellido")
        .populate("idMateria", "nombre")
        .populate("idActividad", "nombre")
        .populate("idEvaluacion", "nombre");
}

//Create nota
export const crearNotaService = async (notaData) => {
    try {
        const nuevaNota = await Nota.create(notaData);
        return nuevaNota;
    } catch (error) {
        throw new Error(`Error al crear la nota: ${error.message}`);
    }
}

//Update nota
export const actualizarNotaService = async (id, notaData) => {
    try {
        return await Nota.findByIdAndUpdate(
            {_id: id},
            notaData,
            { new: true, runValidators: true }
        )
    } catch (error) {
        throw new Error(`Error al actualizar la nota: ${error.message}`);
    }
}

//Delete nota
export const eliminarNotaService = async (id) => {
    try {
        return await Nota.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Error al eliminar la nota: ${error.message}`);
    }
}
