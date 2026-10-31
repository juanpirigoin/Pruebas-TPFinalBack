import mongoose from 'mongoose'
import { ErrorApp } from '../utils/ErrorApp.js'
import Alumno from '../models/alumno.js'

// Get all alumnos por curso
export const listarAlumnoService = async ({ idCurso } = {}) => {
    const filtro = {};
    if (idCurso) {
        filtro.idCurso = new mongoose.Types.ObjectId(idCurso.trim());
    }
    return await Alumno.find(filtro).populate("idCurso", "nombre nivel turno").sort({ apellido: 1, nombre: 1 });
}

// Get alumno por id
export const obtenerAlumnoPorIdService = async (id) => {
    return await Alumno.findById(id).populate("idCurso", "nombre nivel turno");
}

// Create alumno
export const crearAlumnoService = async (alumnoData) => {
    try {
        return await Alumno.create(alumnoData);
    } catch (error) {
        if (error.code === 11000) {
            throw new ErrorApp(`El DNI: ${alumnoData.dni} ya existe`, 409);
        }
        throw error;
    }
}

// Update alumno
export const actualizarAlumnoService = async (id, alumnoData) => {
    try {
        return await Alumno.findByIdAndUpdate(
            id,
            alumnoData,
            { returnDocument: "after", runValidators: true }
        );
    } catch (error) {
        if (error.code === 11000) {
            throw new ErrorApp(`El DNI: ${alumnoData.dni} ya pertenece a otro alumno`, 409);
        }
        throw error;
    }
}

// Delete alumno
export const eliminarAlumnoService = async (id) => {
    return await Alumno.findByIdAndDelete(id);
}
