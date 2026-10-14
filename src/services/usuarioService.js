import mongoose from 'mongoose'
import Usuario from '../models/usuario.js'
import Alumno from '../models/alumno.js'
import Curso from '../models/curso.js'

//Get all usuarios
export const listarUsuariosService = async ({ rol } = {}) => {
    const filtro = {};
    if (rol) {
        filtro.rol = rol.trim();
    }
    return await Usuario.find(filtro).populate("idAlumno", "nombre apellido").populate("idCurso", "nombre nivel turno");
}

//Get usuario por id
export const obtenerUsuarioPorIdService = async (id) => {
    return await Usuario.findById(id).populate("idAlumno", "nombre apellido").populate("idCurso", "nombre nivel turno");
}

//Create usuario
export const crearUsuarioService = async (usuarioData) => {
    try {
        const nuevoUsuario = await Usuario.create(usuarioData);
        return nuevoUsuario;
    } catch (error) {
        if (error.code === 11000) {
            throw new Error(`El email: ${usuarioData.email} ya existe`);
        } else {
            throw new Error(`Error al crear el usuario: ${error.message}`);
        }
    }
}

//Update usuario
export const actualizarUsuarioService = async (id, usuarioData) => {
    try {
        return await Usuario.findByIdAndUpdate(
            id,
            usuarioData,
            { new: true, runValidators: true }
        )
    } catch (error) {
        if (error.code === 11000) {
            throw new Error(`El email: ${usuarioData.email} ya existe`);
        } else {
            throw new Error(`Error al actualizar el usuario: ${error.message}`);
        }
    }
}

//Delete usuario
export const eliminarUsuarioService = async (id) => {
    try {
        return await Usuario.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Error al eliminar el usuario: ${error.message}`);
    }
}
