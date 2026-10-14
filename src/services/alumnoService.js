import mongoose from 'mongoose'
import Alumno from '../models/alumno.js'
import Curso from '../models/curso.js'

//Get all alumnos por curso
export const listarAlumnosService = async ({ idCurso } = {}) => {
    const filtro = {};
    if (idCurso) {
        filtro.idCurso = new mongoose.Types.ObjectId(idCurso.trim());
    }
    return await Alumno.find(filtro).populate("idCurso", "nombre nivel turno").sort({ apellido: 1, nombre: 1 });
}

//Get alumno por id
export const obtenerAlumnoPorIdService = async (id) => {
    return await Alumno.findById(id).populate("idCurso", "nombre nivel turno");
}

//Create alumno
export const crearAlumnoService = async (alumnoData) => {
    try {
        const nuevoAlumno = await Alumno.create(alumnoData);
        return nuevoAlumno;
    } catch (error) {
        //error en duplicado de DNI
        if (error.code === 11000) {
            throw new Error(`El DNI: ${alumnoData.dni} alumno ya existe`);
        } else {
            throw new Error(`Error al crear el alumno: ${error.message}`);
        }

    }
}

//Update alumno
export const actualizarAlumnoService = async (id, alumnoData) => {
    try {
        return Alumno.findByIdAndUpdate(
            {_id: id},
            alumnoData,
            { new: true, runValidators: true }
        )
    } catch (error) {
        //error en duplicado de DNI
        if (error.code === 11000) {
            throw new Error(`El DNI: ${alumnoData.dni} alumno ya existe`);
        } else {
            throw new Error(`Error al actualizar el alumno: ${error.message}`);
        }
    }
}

//Delete alumno
export const eliminarAlumnoService = async (id) => {
    try {
        return Alumno.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Error al eliminar el alumno: ${error.message}`);
    }
}
