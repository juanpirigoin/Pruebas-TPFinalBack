import mongoose from 'mongoose'
import Curso from '../models/curso.js'

//Get all cursos
export const listarCursosService = async () => {
    return await Curso.find()
}

//Get curso por id
export const obtenerCursoPorIdService = async (id) => {
    return await Curso.findById(id)
}

//Create curso
export const crearCursoService = async (cursoData) => {
    try {
        const nuevoCurso = await Curso.create(cursoData);
        return nuevoCurso;
    } catch (error) {
        //error en duplicado de curso??? no tengo clave UNIQUE
        // if (error.code === 11000) {
        //     throw new Error(`El DNI: ${alumnoData.dni} alumno ya existe`);
        // } else {
        //     throw new Error(`Error al crear el alumno: ${error.message}`);
        // }
    }
}

//Update curso
export const actualizarCursoService = async (id, cursoData) => {
    try {
        return Curso.findByIdAndUpdate(
            {_id: id},
            cursoData,
            { new: true, runValidators: true }
        )
    } catch (error) {
        //MISMO PROBLEMA QUE EN LA CREACION... NO HAY CLAVE UNIQUE
    }
}

//Delete curso
export const eliminarCursoService = async (id) => {
    try {
        return Curso.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Error al eliminar el cursoo: ${error.message}`);
    }
}