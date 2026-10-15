import mongoose from 'mongoose'
import Asistencia from '../models/asistencia.js'
import Alumno from '../models/alumno.js'

//Get all asistencias por alumno
export const listarAsistenciaService = async ({ idAlumno } = {}) => {
    const filtro = {};
    if (idAlumno) {
        filtro.idAlumno = new mongoose.Types.ObjectId(idAlumno.trim());
    }
    return await Asistencia.find(filtro).populate("idAlumno", "nombre apellido");
}

//Get asistencia por id
export const obtenerAsistenciaPorIdService = async (id) => {
    return await Asistencia.findById(id).populate("idAlumno", "nombre apellido");
}

//Create asistencia 
export const crearAsistenciaService = async (asistenciaData) => {
    try {
        const nuevaAsistencia = await Asistencia.create(asistenciaData);
        return nuevaAsistencia;
    } catch (error) {
        throw new ErrorApp(`Error al crear la asistencia: ${error.message}`);
    }
}


//DEBERIA EXIXSTIR UN CREAR ASISTENCIA PARA UN GRUPO DE ALUMNOS???? SE PODRIA???


//Update asistencia
export const actualizarAsistenciaService = async (id, asistenciaData) => {
    try {
        return await Asistencia.findByIdAndUpdate(
            { _id: id },
            asistenciaData,
            { new: true, runValidators: true }
        )
    } catch (error) {
        throw new ErrorApp(`Error al actualizar la asistencia: ${error.message}`);
    }
}

//Delete asistencia
export const eliminarAsistenciaService = async (id) => {
    try {
        return await Asistencia.findByIdAndDelete(id);
    } catch (error) {
        throw new ErrorApp(`Error al eliminar la asistencia: ${error.message}`);
    }
}
